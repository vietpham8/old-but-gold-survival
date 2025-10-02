<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Old But Gold - Survival Checklist</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .scenario-card { transition: all 0.3s ease; }
        .scenario-card:hover { transform: translateY(-2px); }
        .checked-item { background-color: #f0fdf4; border-color: #86efac; }
        .priority-critical { color: #dc2626; font-weight: bold; }
        .priority-high { color: #ea580c; font-weight: 600; }
        .priority-medium { color: #ca8a04; }
        .priority-low { color: #6b7280; }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="min-h-screen p-4">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div class="flex items-center gap-3 mb-3">
                    <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <h1 class="text-3xl font-bold text-gray-800">Old But Gold - Survival Checklist</h1>
                </div>
                <p class="text-gray-600 text-sm mb-3">Danh sách công cụ sinh tồn & kỹ năng truyền thống cho mọi tình huống khẩn cấp</p>
                <div class="flex gap-2 flex-wrap">
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">🛠️ Công cụ</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">🎯 Kỹ năng</span>
                </div>
            </div>

            <!-- Filter Tabs -->
            <div class="bg-white rounded-xl shadow-lg p-4 mb-6">
                <h3 class="font-semibold text-gray-700 mb-3">Chọn tình huống:</h3>
                <div id="scenarioTabs" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"></div>
            </div>

            <!-- View Toggle -->
            <div class="bg-white rounded-xl shadow-lg p-4 mb-6">
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-gray-700">Hiển thị:</h3>
                    <div class="flex gap-2">
                        <button onclick="setView('tools')" id="btnTools" class="px-4 py-2 rounded-lg font-medium transition-all">Công cụ</button>
                        <button onclick="setView('skills')" id="btnSkills" class="px-4 py-2 rounded-lg font-medium transition-all">Kỹ năng</button>
                        <button onclick="setView('all')" id="btnAll" class="px-4 py-2 rounded-lg font-medium transition-all">Tất cả</button>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div id="content" class="space-y-6"></div>

            <!-- Footer -->
            <div class="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold mb-3">💡 Nguyên tắc "Old But Gold"</h3>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 class="font-bold mb-2">🛠️ Công cụ:</h4>
                        <ul class="space-y-1">
                            <li>✅ Đơn giản - Ít hỏng hóc</li>
                            <li>✅ Độc lập - Không cần điện</li>
                            <li>✅ Đa năng - Nhiều mục đích</li>
                            <li>✅ Bền bỉ - Dùng lâu dài</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-2">🎯 Kỹ năng:</h4>
                        <ul class="space-y-1">
                            <li>✅ Cơ bản - Dễ học, dễ nhớ</li>
                            <li>✅ Thiết yếu - Cứu mạng</li>
                            <li>✅ Không cần công cụ - Dùng tay không</li>
                            <li>✅ Truyền thống - Đã được kiểm chứng</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // ===== CẤU HÌNH TÌNH HUỐNG =====
        // Thêm tình huống mới vào đây
        const scenarios = {
            car: { name: "🚗 Xe hơi", color: "blue" },
            home: { name: "🏠 Gia đình", color: "green" },
            outdoor: { name: "⛰️ Phượt/Rừng", color: "orange" },
            financial: { name: "💰 Tài chính", color: "purple" },
            flood: { name: "🌊 Lũ lụt", color: "cyan" },
            storm: { name: "🌪️ Bão/Mưa", color: "indigo" },
            landslide: { name: "⛰️ Sạt lở", color: "amber" },
            war: { name: "⚔️ Chiến tranh", color: "red" },
            evacuation: { name: "🏃 Sơ tán", color: "yellow" },
            riot: { name: "🔥 Bạo loạn", color: "rose" }
            // Thêm tình huống khác tại đây...
        };

        // ===== DANH SÁCH CÔNG CỤ =====
        // Format: { name: "Tên công cụ", priority: "critical/high/medium/low", reason: "Lý do" }
        const tools = {
            car: [
                { name: "Dây cáp kích điện", priority: "critical", reason: "Ắc quy yếu" },
                { name: "Bộ dụng cụ sửa xe", priority: "critical", reason: "Sửa chữa" },
                { name: "Đèn pin + pin", priority: "critical", reason: "Chiếu sáng" }
                // Thêm công cụ xe hơi khác...
            ],
            home: [
                { name: "Đèn pin quay tay", priority: "critical", reason: "Cúp điện" },
                { name: "Nước đóng chai", priority: "critical", reason: "Cúp nước" }
                // Thêm công cụ gia đình khác...
            ],
            outdoor: [
                { name: "Dao sinh tồn", priority: "critical", reason: "Chặt, tự vệ" },
                { name: "Bật lửa", priority: "critical", reason: "Đốt lửa" }
                // Thêm công cụ phượt khác...
            ],
            financial: [
                { name: "Tiền mặt nhỏ", priority: "critical", reason: "Không ATM" }
                // Thêm công cụ tài chính khác...
            ],
            flood: [
                { name: "Phao bơi/Áo phao", priority: "critical", reason: "Thoát lũ" }
                // Thêm công cụ lũ lụt khác...
            ],
            storm: [
                { name: "Băng keo dán cửa", priority: "critical", reason: "Chống vỡ kính" }
                // Thêm công cụ bão khác...
            ],
            landslide: [
                { name: "Xẻng/Cuốc", priority: "critical", reason: "Đào bới" }
                // Thêm công cụ sạt lở khác...
            ],
            war: [
                { name: "Túi ba lô khẩn cấp", priority: "critical", reason: "Di chuyển nhanh" }
                // Thêm công cụ chiến tranh khác...
            ],
            evacuation: [
                { name: "Giấy tờ tùy thân", priority: "critical", reason: "CMND, Passport" }
                // Thêm công cụ sơ tán khác...
            ],
            riot: [
                { name: "Khẩu trang N95", priority: "critical", reason: "Hơi cay" }
                // Thêm công cụ bạo loạn khác...
            ]
        };

        // ===== DANH SÁCH KỸ NĂNG =====
        const skills = {
            car: [
                { name: "Sơ cứu cơ bản (CPR)", priority: "critical", reason: "Cứu người" },
                { name: "Thay lốp xe", priority: "critical", reason: "Lốp xẹp" }
                // Thêm kỹ năng xe hơi khác...
            ],
            home: [
                { name: "Sơ cứu Heimlich", priority: "critical", reason: "Nghẹn thở" },
                { name: "Đun nước khử trùng", priority: "high", reason: "Khử trùng" }
                // Thêm kỹ năng gia đình khác...
            ],
            outdoor: [
                { name: "Đốt lửa không diêm", priority: "critical", reason: "Sưởi ấm" },
                { name: "Tìm nước trong rừng", priority: "critical", reason: "Nước uống" }
                // Thêm kỹ năng phượt khác...
            ],
            financial: [
                { name: "Quản lý tiền khẩn cấp", priority: "critical", reason: "Ưu tiên chi" }
                // Thêm kỹ năng tài chính khác...
            ],
            flood: [
                { name: "Bơi cơ bản", priority: "critical", reason: "Thoát lũ" }
                // Thêm kỹ năng lũ lụt khác...
            ],
            storm: [
                { name: "Gia cố cửa sổ", priority: "critical", reason: "Trước bão" }
                // Thêm kỹ năng bão khác...
            ],
            landslide: [
                { name: "Nhận biết sạt lở", priority: "critical", reason: "Thoát sớm" }
                // Thêm kỹ năng sạt lở khác...
            ],
            war: [
                { name: "Tìm nơi trú ẩn", priority: "critical", reason: "Tránh bom đạn" }
                // Thêm kỹ năng chiến tranh khác...
            ],
            evacuation: [
                { name: "Chuẩn bị túi khẩn cấp", priority: "critical", reason: "Lấy nhanh" }
                // Thêm kỹ năng sơ tán khác...
            ],
            riot: [
                { name: "Tránh xa đám đông", priority: "critical", reason: "An toàn" }
                // Thêm kỹ năng bạo loạn khác...
            ]
        };

        // ===== HỆ THỐNG - KHÔNG CẦN CHỈNH SỬA =====
        let checkedItems = JSON.parse(localStorage.getItem('checkedItems') || '{}');
        let currentScenario = 'all';
        let currentView = 'tools';

        function saveChecked() {
            localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
        }

        function setView(view) {
            currentView = view;
            ['btnTools', 'btnSkills', 'btnAll'].forEach(id => {
                const btn = document.getElementById(id);
                const isActive = (id === 'btn' + view.charAt(0).toUpperCase() + view.slice(1)) || 
                                 (id === 'btnAll' && view === 'all');
                btn.className = isActive ? 
                    'px-4 py-2 rounded-lg font-medium transition-all bg-indigo-500 text-white' : 
                    'px-4 py-2 rounded-lg font-medium transition-all bg-white text-gray-700 border-2 border-gray-300';
            });
            renderContent();
        }

        function setScenario(scenario) {
            currentScenario = scenario;
            renderTabs();
            renderContent();
        }

        function toggleItem(type, category, index) {
            const key = `${type}-${category}-${index}`;
            checkedItems[key] = !checkedItems[key];
            saveChecked();
            renderContent();
        }

        function getPriorityBadge(priority) {
            const badges = {
                critical: { text: 'BẮT BUỘC', class: 'bg-red-100 text-red-700 border-red-300' },
                high: { text: 'QUAN TRỌNG', class: 'bg-orange-100 text-orange-700 border-orange-300' },
                medium: { text: 'NÊN CÓ', class: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
                low: { text: 'TÙY CHỌN', class: 'bg-gray-100 text-gray-600 border-gray-300' }
            };
            const badge = badges[priority];
            return `<span class="text-xs px-2 py-0.5 rounded border ${badge.class}">${badge.text}</span>`;
        }

        function getProgress(type, category) {
            const items = type === 'tools' ? tools[category] : skills[category];
            if (!items || items.length === 0) return 0;
            const checked = items.filter((_, idx) => checkedItems[`${type}-${category}-${idx}`]).length;
            return Math.round((checked / items.length) * 100);
        }

        function renderTabs() {
            const tabsHtml = `
                <button onclick="setScenario('all')" class="p-3 rounded-lg border-2 transition-all ${
                    currentScenario === 'all' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                }">
                    <div class="text-2xl mb-1">🌍</div>
                    <div class="text-xs font-medium">Tất cả</div>
                </button>
                ${Object.entries(scenarios).map(([key, s]) => `
                    <button onclick="setScenario('${key}')" class="p-3 rounded-lg border-2 transition-all ${
                        currentScenario === key ? `bg-${s.color}-500 text-white` : 'bg-white text-gray-700 border-gray-300'
                    }">
                        <div class="text-xs font-medium">${s.name}</div>
                    </button>
                `).join('')}
            `;
            document.getElementById('scenarioTabs').innerHTML = tabsHtml;
        }

        function renderSection(type, category, items) {
            if (!items || items.length === 0) return '';
            
            const typeLabel = type === 'tools' ? '🛠️ Công cụ' : '🎯 Kỹ năng';
            const typeColor = type === 'tools' ? 'indigo' : 'blue';
            const progress = getProgress(type, category);
            const checked = items.filter((_, idx) => checkedItems[`${type}-${category}-${idx}`]).length;

            return `
                <div class="bg-gradient-to-r from-${typeColor}-50 to-white p-3 rounded-lg mb-3">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="font-bold text-${typeColor}-700">${typeLabel}</h3>
                        <span class="text-sm text-${typeColor}-600">${checked}/${items.length}</span>
                    </div>
                    <div class="w-full bg-${typeColor}-200 rounded-full h-2 mb-3">
                        <div class="bg-${typeColor}-600 h-2 rounded-full transition-all" style="width: ${progress}%"></div>
                    </div>
                    <div class="space-y-2">
                        ${items.map((item, idx) => {
                            const key = `${type}-${category}-${idx}`;
                            const isChecked = checkedItems[key];
                            return `
                                <div class="border rounded-lg p-3 transition-all ${isChecked ? 'checked-item' : 'bg-white border-gray-200'}">
                                    <label class="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" ${isChecked ? 'checked' : ''} 
                                            onchange="toggleItem('${type}', '${category}', ${idx})"
                                            class="mt-1 w-5 h-5 cursor-pointer">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1 flex-wrap">
                                                ${getPriorityBadge(item.priority)}
                                                <span class="font-medium priority-${item.priority}">${item.name}</span>
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

        function renderContent() {
            const categories = currentScenario === 'all' ? Object.keys(scenarios) : [currentScenario];
            
            const contentHtml = categories.map(category => {
                const scenario = scenarios[category];
                const toolItems = tools[category] || [];
                const skillItems = skills[category] || [];
                
                let sectionsHtml = '';
                if (currentView === 'tools' || currentView === 'all') {
                    sectionsHtml += renderSection('tools', category, toolItems);
                }
                if (currentView === 'skills' || currentView === 'all') {
                    sectionsHtml += renderSection('skills', category, skillItems);
                }
                
                if (!sectionsHtml) return '';

                const totalItems = (currentView === 'all' ? toolItems.length + skillItems.length : 
                                   currentView === 'tools' ? toolItems.length : skillItems.length);
                const totalChecked = (currentView === 'all' || currentView === 'tools' ? 
                    toolItems.filter((_, idx) => checkedItems[`tools-${category}-${idx}`]).length : 0) +
                    (currentView === 'all' || currentView === 'skills' ? 
                    skillItems.filter((_, idx) => checkedItems[`skills-${category}-${idx}`]).length : 0);
                const totalProgress = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

                return `
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden scenario-card">
                        <div class="bg-gradient-to-r from-${scenario.color}-500 to-${scenario.color}-600 text-white p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h2 class="text-xl font-bold">${scenario.name}</h2>
                                <div class="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                                    ${totalChecked} / ${totalItems}
                                </div>
                            </div>
                            <div class="w-full bg-white bg-opacity-20 rounded-full h-2">
                                <div class="bg-white h-2 rounded-full transition-all" style="width: ${totalProgress}%"></div>
                            </div>
                        </div>
                        <div class="p-4">${sectionsHtml}</div>
                    </div>
                `;
            }).join('');

            document.getElementById('content').innerHTML = contentHtml;
        }

        // Khởi tạo
        renderTabs();
        setView('tools');
    </script>
</body>
</html>