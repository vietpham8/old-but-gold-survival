// ===== HỆ THỐNG QUẢN LÝ CHECKLIST =====

let checkedItems = JSON.parse(localStorage.getItem('checkedItems') || '{}');
let currentScenario = 'all';
let currentView = 'tools';

// Lưu trạng thái checkbox
function saveChecked() {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
}

// Đổi chế độ hiển thị (Công cụ/Kỹ năng/Mindset/Tất cả)
function setView(view) {
    currentView = view;
    ['btnTools', 'btnSkills', 'btnMindset', 'btnAll'].forEach(id => {
        const btn = document.getElementById(id);
        const isActive = (id === 'btn' + view.charAt(0).toUpperCase() + view.slice(1)) ||
                         (id === 'btnAll' && view === 'all');
        btn.className = isActive ?
            'px-4 py-2 rounded-lg font-medium transition-all bg-indigo-500 text-white shadow-md' :
            'px-4 py-2 rounded-lg font-medium transition-all bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-300';
    });
    renderContent();
}

// Chọn tình huống
function setScenario(scenario) {
    currentScenario = scenario;
    renderTabs();
    renderContent();
}

// Đánh dấu/Bỏ đánh dấu item
function toggleItem(type, category, index) {
    const key = `${type}-${category}-${index}`;
    checkedItems[key] = !checkedItems[key];
    saveChecked();
    renderContent();
}

// Lấy badge ưu tiên
function getPriorityBadge(priority) {
    const badges = {
        critical: { text: '🔴 BẮT BUỘC', class: 'bg-red-100 text-red-700 border-red-300' },
        high: { text: '🟠 QUAN TRỌNG', class: 'bg-orange-100 text-orange-700 border-orange-300' },
        medium: { text: '🟡 NÊN CÓ', class: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
        low: { text: '⚪ TÙY CHỌN', class: 'bg-gray-100 text-gray-600 border-gray-300' }
    };
    const badge = badges[priority];
    return `<span class="text-xs px-2 py-0.5 rounded border font-semibold ${badge.class}">${badge.text}</span>`;
}

// Tính % hoàn thành
function getProgress(type, category) {
    const items = type === 'tools' ? tools[category] : skills[category];
    if (!items || items.length === 0) return 0;
    const checked = items.filter((_, idx) => checkedItems[`${type}-${category}-${idx}`]).length;
    return Math.round((checked / items.length) * 100);
}

// Render tabs tình huống
function renderTabs() {
    const tabsHtml = `
        <button onclick="setScenario('all')" class="p-3 rounded-lg border-2 transition-all ${
            currentScenario === 'all' ? 'bg-indigo-500 text-white border-indigo-500 shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
        }">
            <div class="text-2xl mb-1">🌍</div>
            <div class="text-xs font-medium">Tất cả</div>
        </button>
        ${Object.entries(scenarios).map(([key, s]) => `
            <button onclick="setScenario('${key}')" class="p-3 rounded-lg border-2 transition-all ${
                currentScenario === key ? `bg-${s.color}-500 text-white border-${s.color}-500 shadow-md` : 'bg-white text-gray-700 border-gray-300 hover:border-' + s.color + '-300'
            }" title="${s.desc}">
                <div class="text-xs font-medium">${s.name}</div>
            </button>
        `).join('')}
    `;
    document.getElementById('scenarioTabs').innerHTML = tabsHtml;
}

// Render từng section (Công cụ, Kỹ năng, hoặc Mindset)
function renderSection(type, category, items) {
    if (!items || items.length === 0) return '';

    const typeLabel = type === 'tools' ? '🛠️ Công cụ' : type === 'skills' ? '🎯 Kỹ năng' : '🧠 Mindset';
    const typeColor = type === 'tools' ? 'indigo' : type === 'skills' ? 'blue' : 'purple';

    // Mindset không có checkbox, không tính progress
    if (type === 'mindset') {
        return `
            <div class="bg-gradient-to-r from-${typeColor}-50 to-white p-4 rounded-lg mb-4 border border-${typeColor}-100">
                <h3 class="font-bold text-${typeColor}-700 text-lg mb-3">${typeLabel}</h3>
                <div class="space-y-3">
                    ${items.map((item, idx) => `
                        <div class="border-l-4 border-${typeColor}-500 bg-white rounded-r-lg p-3 shadow-sm">
                            <div class="font-bold text-${typeColor}-700 mb-1">"${item.quote}"</div>
                            <div class="text-sm text-gray-600 italic">→ ${item.meaning}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    const progress = getProgress(type, category);
    const checked = items.filter((_, idx) => checkedItems[`${type}-${category}-${idx}`]).length;

    return `
        <div class="bg-gradient-to-r from-${typeColor}-50 to-white p-4 rounded-lg mb-4 border border-${typeColor}-100">
            <div class="flex items-center justify-between mb-2">
                <h3 class="font-bold text-${typeColor}-700 text-lg">${typeLabel}</h3>
                <span class="text-sm text-${typeColor}-600 font-semibold bg-${typeColor}-100 px-3 py-1 rounded-full">${checked}/${items.length}</span>
            </div>
            <div class="w-full bg-${typeColor}-200 rounded-full h-2.5 mb-3">
                <div class="bg-${typeColor}-600 h-2.5 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
            </div>
            <div class="space-y-2">
                ${items.map((item, idx) => {
                    const key = `${type}-${category}-${idx}`;
                    const isChecked = checkedItems[key];
                    return `
                        <div class="border rounded-lg p-3 transition-all ${isChecked ? 'checked-item shadow-sm' : 'bg-white border-gray-200 hover:border-gray-300'}">
                            <label class="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" ${isChecked ? 'checked' : ''}
                                    onchange="toggleItem('${type}', '${category}', ${idx})"
                                    class="mt-1 w-5 h-5 cursor-pointer text-green-600 focus:ring-green-500">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                                        ${getPriorityBadge(item.priority)}
                                        <span class="font-medium priority-${item.priority} text-gray-800">${item.name}</span>
                                    </div>
                                    <p class="text-sm text-gray-600"><strong>Lý do:</strong> ${item.reason}</p>
                                </div>
                            </label>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Render nội dung chính
function renderContent() {
    const categories = currentScenario === 'all' ? Object.keys(scenarios) : [currentScenario];

    let contentHtml = '';

    // Hiển thị Mindset Chung nếu chọn "Tất cả" hoặc "Mindset"
    if (currentScenario === 'all' && (currentView === 'mindset' || currentView === 'all')) {
        const generalMindsets = mindsets.general || [];
        if (generalMindsets.length > 0) {
            contentHtml += `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden scenario-card mb-6">
                    <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
                        <h2 class="text-xl font-bold mb-1">🧠 Mindset Chung - Áp Dụng Cho Mọi Tình Huống</h2>
                        <p class="text-sm opacity-90">Nguyên tắc vàng trong mọi khủng hoảng</p>
                    </div>
                    <div class="p-4">
                        ${renderSection('mindset', 'general', generalMindsets)}
                    </div>
                </div>
            `;
        }
    }

    contentHtml += categories.map(category => {
        const scenario = scenarios[category];
        const toolItems = tools[category] || [];
        const skillItems = skills[category] || [];
        const mindsetItems = mindsets[category] || [];

        let sectionsHtml = '';
        if (currentView === 'tools' || currentView === 'all') {
            sectionsHtml += renderSection('tools', category, toolItems);
        }
        if (currentView === 'skills' || currentView === 'all') {
            sectionsHtml += renderSection('skills', category, skillItems);
        }
        if (currentView === 'mindset' || currentView === 'all') {
            sectionsHtml += renderSection('mindset', category, mindsetItems);
        }

        if (!sectionsHtml) return '';

        const totalItems = (currentView === 'all' ? toolItems.length + skillItems.length :
                           currentView === 'tools' ? toolItems.length :
                           currentView === 'skills' ? skillItems.length :
                           currentView === 'mindset' ? mindsetItems.length : 0);
        const totalChecked = (currentView === 'all' || currentView === 'tools' ?
            toolItems.filter((_, idx) => checkedItems[`tools-${category}-${idx}`]).length : 0) +
            (currentView === 'all' || currentView === 'skills' ?
            skillItems.filter((_, idx) => checkedItems[`skills-${category}-${idx}`]).length : 0);
        const totalProgress = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden scenario-card">
                <div class="bg-gradient-to-r from-${scenario.color}-500 to-${scenario.color}-600 text-white p-4">
                    <div class="flex items-center justify-between mb-2">
                        <div>
                            <h2 class="text-xl font-bold mb-1">${scenario.name}</h2>
                            <p class="text-sm opacity-90">${scenario.desc}</p>
                        </div>
                        <div class="text-right">
                            <div class="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full font-semibold">
                                ${totalChecked} / ${totalItems}
                            </div>
                            <div class="text-xs mt-1 opacity-75">${totalProgress}%</div>
                        </div>
                    </div>
                    <div class="w-full bg-white bg-opacity-20 rounded-full h-2.5">
                        <div class="bg-white h-2.5 rounded-full transition-all duration-300" style="width: ${totalProgress}%"></div>
                    </div>
                </div>
                <div class="p-4">${sectionsHtml}</div>
            </div>
        `;
    }).join('');

    document.getElementById('content').innerHTML = contentHtml.trim() || '<div class="text-center text-gray-500 py-8">Không có dữ liệu</div>';
}

// ===== CHỨC NĂNG IN ẤN & EXPORT PDF =====

// In các mục đã chọn
function printCheckedItems() {
    const checkedCount = Object.values(checkedItems).filter(v => v).length;

    if (checkedCount === 0) {
        alert('⚠️ Chưa có mục nào được chọn!\n\nVui lòng đánh dấu ít nhất 1 mục để in.');
        return;
    }

    const printData = generatePrintData(true); // only checked
    openPrintWindow(printData, `Checklist đã chọn (${checkedCount} mục)`);
}

// In tất cả mục
function printAllItems() {
    const printData = generatePrintData(false); // all items
    const totalCount = countAllItems();
    openPrintWindow(printData, `Checklist đầy đủ (${totalCount} mục)`);
}

// Đếm tổng số items
function countAllItems() {
    let total = 0;
    Object.keys(scenarios).forEach(category => {
        const toolItems = tools[category] || [];
        const skillItems = skills[category] || [];
        total += toolItems.length + skillItems.length;
    });
    return total;
}

// Tạo dữ liệu in
function generatePrintData(onlyChecked) {
    const categories = currentScenario === 'all' ? Object.keys(scenarios) : [currentScenario];
    let html = '';

    // Thêm Mindset Chung nếu chọn "Tất cả"
    if (currentScenario === 'all' && (currentView === 'mindset' || currentView === 'all')) {
        const generalMindsets = mindsets.general || [];
        if (generalMindsets.length > 0) {
            html += `
                <div class="scenario-section" style="margin-bottom: 30px; page-break-inside: avoid; background: #faf5ff; padding: 15px; border-radius: 8px;">
                    <h2 style="font-size: 22px; font-weight: bold; color: #7c3aed; border-bottom: 3px solid #7c3aed; padding-bottom: 8px; margin-bottom: 15px;">
                        🧠 Mindset Chung - Áp Dụng Cho Mọi Tình Huống
                    </h2>
                    <div style="background: #ffffff; border-left: 4px solid #7c3aed; padding: 12px;">
            `;

            generalMindsets.forEach(item => {
                html += `
                    <div style="margin-bottom: 12px; padding: 8px; background: #f5f3ff; border-radius: 4px;">
                        <div style="font-weight: bold; color: #7c3aed; margin-bottom: 4px;">"${item.quote}"</div>
                        <div style="font-size: 13px; color: #4b5563; font-style: italic;">→ ${item.meaning}</div>
                    </div>
                `;
            });

            html += `</div></div>`;
        }
    }

    categories.forEach(category => {
        const scenario = scenarios[category];
        const toolItems = tools[category] || [];
        const skillItems = skills[category] || [];
        const mindsetItems = mindsets[category] || [];

        // Filter items if only checked
        const filteredTools = onlyChecked ?
            toolItems.filter((_, idx) => checkedItems[`tools-${category}-${idx}`]) :
            toolItems;
        const filteredSkills = onlyChecked ?
            skillItems.filter((_, idx) => checkedItems[`skills-${category}-${idx}`]) :
            skillItems;

        // Mindset always show (no checkbox)
        const filteredMindsets = mindsetItems;

        if (filteredTools.length === 0 && filteredSkills.length === 0 && filteredMindsets.length === 0) return;

        html += `
            <div class="scenario-section" style="margin-bottom: 30px; page-break-inside: avoid;">
                <h2 style="font-size: 20px; font-weight: bold; color: #1f2937; border-bottom: 3px solid #3b82f6; padding-bottom: 8px; margin-bottom: 15px;">
                    ${scenario.name}
                </h2>
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 15px;">${scenario.desc}</p>
        `;

        // Công cụ
        if ((currentView === 'tools' || currentView === 'all') && filteredTools.length > 0) {
            html += `
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #4f46e5; margin-bottom: 10px;">
                        🛠️ Công cụ (${filteredTools.length})
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
            `;

            filteredTools.forEach((item, idx) => {
                const originalIdx = onlyChecked ?
                    toolItems.findIndex((t, i) => checkedItems[`tools-${category}-${i}`] && t === item) :
                    idx;
                const isChecked = checkedItems[`tools-${category}-${originalIdx}`];
                const priorityText = {
                    critical: '🔴 BẮT BUỘC',
                    high: '🟠 QUAN TRỌNG',
                    medium: '🟡 NÊN CÓ',
                    low: '⚪ TÙY CHỌN'
                }[item.priority];

                html += `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="width: 30px; padding: 8px 5px; vertical-align: top;">
                            <div class="print-checkbox ${isChecked ? 'checked' : ''}" style="width: 16px; height: 16px; border: 2px solid #333; display: inline-block;">${isChecked ? '✓' : ''}</div>
                        </td>
                        <td style="padding: 8px 5px;">
                            <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">${priorityText}</div>
                            <div style="font-weight: 600; color: #1f2937; margin-bottom: 3px;">${item.name}</div>
                            <div style="font-size: 13px; color: #4b5563;"><strong>Lý do:</strong> ${item.reason}</div>
                        </td>
                    </tr>
                `;
            });

            html += `</table></div>`;
        }

        // Kỹ năng
        if ((currentView === 'skills' || currentView === 'all') && filteredSkills.length > 0) {
            html += `
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #2563eb; margin-bottom: 10px;">
                        🎯 Kỹ năng (${filteredSkills.length})
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
            `;

            filteredSkills.forEach((item, idx) => {
                const originalIdx = onlyChecked ?
                    skillItems.findIndex((s, i) => checkedItems[`skills-${category}-${i}`] && s === item) :
                    idx;
                const isChecked = checkedItems[`skills-${category}-${originalIdx}`];
                const priorityText = {
                    critical: '🔴 BẮT BUỘC',
                    high: '🟠 QUAN TRỌNG',
                    medium: '🟡 NÊN CÓ',
                    low: '⚪ TÙY CHỌN'
                }[item.priority];

                html += `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="width: 30px; padding: 8px 5px; vertical-align: top;">
                            <div class="print-checkbox ${isChecked ? 'checked' : ''}" style="width: 16px; height: 16px; border: 2px solid #333; display: inline-block;">${isChecked ? '✓' : ''}</div>
                        </td>
                        <td style="padding: 8px 5px;">
                            <div style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">${priorityText}</div>
                            <div style="font-weight: 600; color: #1f2937; margin-bottom: 3px;">${item.name}</div>
                            <div style="font-size: 13px; color: #4b5563;"><strong>Lý do:</strong> ${item.reason}</div>
                        </td>
                    </tr>
                `;
            });

            html += `</table></div>`;
        }

        // Mindset
        if ((currentView === 'mindset' || currentView === 'all') && filteredMindsets.length > 0) {
            html += `
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 16px; font-weight: bold; color: #7c3aed; margin-bottom: 10px;">
                        🧠 Mindset Sinh Tồn (${filteredMindsets.length})
                    </h3>
                    <div style="background: #f5f3ff; border-left: 4px solid #7c3aed; padding: 10px;">
            `;

            filteredMindsets.forEach((item, idx) => {
                html += `
                    <div style="margin-bottom: 12px; padding: 8px; background: white; border-radius: 4px;">
                        <div style="font-weight: bold; color: #7c3aed; margin-bottom: 4px;">"${item.quote}"</div>
                        <div style="font-size: 13px; color: #4b5563; font-style: italic;">→ ${item.meaning}</div>
                    </div>
                `;
            });

            html += `</div></div>`;
        }

        html += `</div>`;
    });

    return html;
}

// Mở cửa sổ in
function openPrintWindow(content, title) {
    const printWindow = window.open('', '', 'width=800,height=600');

    const fullHtml = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>${title} - Old But Gold Survival Checklist</title>
            <style>
                @page {
                    size: A4;
                    margin: 15mm;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.5;
                    color: #1f2937;
                    margin: 0;
                    padding: 20px;
                }
                .print-header {
                    text-align: center;
                    border-bottom: 3px solid #1f2937;
                    padding-bottom: 15px;
                    margin-bottom: 25px;
                }
                .print-header h1 {
                    font-size: 24px;
                    margin: 0 0 8px 0;
                    color: #dc2626;
                }
                .print-header p {
                    margin: 5px 0;
                    color: #6b7280;
                    font-size: 14px;
                }
                .print-footer {
                    margin-top: 30px;
                    padding-top: 15px;
                    border-top: 2px solid #e5e7eb;
                    text-align: center;
                    font-size: 12px;
                    color: #9ca3af;
                }
                .scenario-section {
                    page-break-inside: avoid;
                    margin-bottom: 30px;
                }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h1>🛡️ OLD BUT GOLD - SURVIVAL CHECKLIST</h1>
                <p><strong>${title}</strong></p>
                <p>Ngày in: ${new Date().toLocaleDateString('vi-VN')} | Giờ: ${new Date().toLocaleTimeString('vi-VN')}</p>
            </div>

            ${content}

            <div class="print-footer">
                <p>© Old But Gold - Survival Checklist | Công cụ & Kỹ năng sinh tồn truyền thống</p>
                <p>Lưu trữ tài liệu này ở nơi dễ tìm kiếm trong trường hợp khẩn cấp</p>
            </div>

            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-right: 10px;">
                    🖨️ In ngay
                </button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                    ❌ Đóng
                </button>
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(fullHtml);
    printWindow.document.close();

    // Auto print after load
    printWindow.onload = function() {
        setTimeout(() => {
            printWindow.print();
        }, 250);
    };
}

// Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', function() {
    renderTabs();
    setView('tools');
});
