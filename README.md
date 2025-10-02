# 🛡️ Old But Gold - Survival Checklist

## 📋 Tổng quan
Ứng dụng web checklist công cụ & kỹ năng sinh tồn "Old But Gold" cho mọi tình huống khẩn cấp. Sử dụng HTML/CSS/JavaScript thuần, lưu trữ dữ liệu với localStorage, dễ dàng deploy lên Netlify hoặc Render.

## ✨ Tính năng

### 🎯 Tình huống được hỗ trợ (13 tình huống)
1. **🚗 Xe hơi** - Xe hư, sa lầy, tai nạn, lạc đường
2. **🏍️ Xe máy** - Xe hư giữa đường, tai nạn
3. **🏠 Gia đình** - Cúp điện/nước, thiên tai
4. **⛰️ Phượt/Rừng** - Lạc trong rừng, thời tiết xấu
5. **💰 Tài chính** - Hết tiền mặt, không chuyển khoản
6. **🌊 Lũ lụt** - Nước dâng, nhà ngập
7. **🌪️ Bão/Mưa** - Bão đổ bộ, mưa dài ngày
8. **⛰️ Sạt lở** - Đất đá sạt lở, đường bị chặn
9. **⚔️ Chiến tranh** - Xung đột vũ trang
10. **🏃 Sơ tán khẩn cấp** - Di chuyển đột ngột
11. **🔥 Bạo loạn** - Biểu tình bạo lực
12. **🌋 Động đất** - Rung lắc, sập nhà
13. **🔥 Cháy nhà** - Hỏa hoạn, thoát hiểm

### 🛠️ Chức năng
- ✅ **Phân loại rõ ràng**: Công cụ, Kỹ năng & Mindset
- ✅ **Mức độ ưu tiên**: Bắt buộc / Quan trọng / Nên có / Tùy chọn
- ✅ **Lưu tiến độ**: LocalStorage (không cần database)
- ✅ **Responsive**: Hoạt động tốt trên mobile/tablet/desktop
- ✅ **Progress tracking**: Theo dõi % hoàn thành từng tình huống
- ✅ **Filter linh hoạt**: Xem theo tình huống hoặc tất cả
- ✅ **In ấn & PDF**: In checklist đã chọn hoặc tất cả, tối ưu cho A4
- ✅ **Export Print-friendly**: Layout chuyên nghiệp, dễ đọc, dễ lưu trữ
- ✅ **Mindset Sinh Tồn**: Nguyên tắc "Old But Gold" cho từng tình huống

## 🚀 Deploy lên Netlify

### Cách 1: Deploy trực tiếp từ GitHub

1. **Push code lên GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Old But Gold Survival Checklist"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/survival-checklist.git
git push -u origin main
```

2. **Deploy trên Netlify**
- Đăng nhập [Netlify](https://app.netlify.com)
- Click **"Add new site" → "Import an existing project"**
- Chọn **GitHub** và authorize
- Chọn repository **survival-checklist**
- Build settings:
  - **Build command**: (để trống)
  - **Publish directory**: `/` hoặc `.`
- Click **"Deploy site"**

### Cách 2: Deploy bằng Netlify CLI

```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Cách 3: Drag & Drop
- Vào [Netlify Drop](https://app.netlify.com/drop)
- Kéo thả toàn bộ folder vào
- Done! 🎉

## 🚀 Deploy lên Render

### Cách 1: Deploy từ GitHub

1. **Push code lên GitHub** (như hướng dẫn Netlify)

2. **Deploy trên Render**
- Đăng nhập [Render](https://dashboard.render.com)
- Click **"New" → "Static Site"**
- Connect GitHub repository
- Settings:
  - **Name**: survival-checklist
  - **Branch**: main
  - **Build Command**: (để trống)
  - **Publish Directory**: `.` hoặc `/`
- Click **"Create Static Site"**

### Cách 2: Deploy bằng Render CLI

```bash
# Cài đặt Render CLI
npm install -g @render/cli

# Login
render login

# Deploy
render deploy
```

## 📁 Cấu trúc dự án

```
old-but-gold-survival-checklist/
│
├── index.html          # Giao diện chính
├── data.js            # Dữ liệu tình huống, công cụ, kỹ năng
├── app.js             # Logic ứng dụng
├── README.md          # Tài liệu này
│
├── _redirects         # (Tùy chọn) Netlify redirects
└── netlify.toml       # (Tùy chọn) Netlify config
```

## 🔧 Tùy chỉnh dữ liệu

### Thêm tình huống mới
Chỉnh sửa `data.js`:

```javascript
const scenarios = {
    // ... các tình huống có sẵn
    newScenario: {
        name: "🆕 Tình huống mới",
        color: "teal",
        desc: "Mô tả tình huống"
    }
};
```

### Thêm công cụ/kỹ năng

```javascript
const tools = {
    newScenario: [
        {
            name: "Tên công cụ",
            priority: "critical", // critical/high/medium/low
            reason: "Lý do cần thiết"
        }
    ]
};

const skills = {
    newScenario: [
        {
            name: "Tên kỹ năng",
            priority: "critical",
            reason: "Lý do cần thiết"
        }
    ]
};
```

## 🎨 Tailwind CSS Colors

Các màu có sẵn cho tình huống mới:
- `blue`, `green`, `red`, `yellow`, `purple`, `pink`
- `indigo`, `cyan`, `teal`, `orange`, `amber`, `lime`
- `emerald`, `sky`, `violet`, `fuchsia`, `rose`, `stone`

## 📱 Responsive Design

- **Mobile**: 1-2 columns
- **Tablet**: 3-4 columns
- **Desktop**: 4-6 columns

## 🔒 Privacy & Security

- ✅ **100% Client-side**: Không có server backend
- ✅ **LocalStorage**: Dữ liệu lưu trên trình duyệt người dùng
- ✅ **Không thu thập dữ liệu**: Hoàn toàn private
- ✅ **Offline ready**: Hoạt động không cần internet sau lần load đầu

## 🐛 Troubleshooting

### LocalStorage không hoạt động
- Kiểm tra trình duyệt có bật localStorage
- Xóa cache và reload: `Ctrl + Shift + R`

### Tailwind CSS không load
- Kiểm tra kết nối internet (CDN)
- Hoặc tải Tailwind về local:
```html
<link href="./tailwind.min.css" rel="stylesheet">
```

### Progress bar không hiển thị màu
- Tailwind CDN không hỗ trợ dynamic colors
- Sử dụng Tailwind config để whitelist colors

## 🖨️ Hướng dẫn In ấn & Lưu PDF

### Cách sử dụng:

1. **In mục đã chọn** (✅)
   - Đánh dấu các mục bạn đã chuẩn bị/sở hữu
   - Click nút **"In mục đã chọn"** (màu xanh lá)
   - Xem trước → Click **"In ngay"** hoặc **"Save as PDF"**

2. **In tất cả** (📄)
   - Click nút **"In tất cả"** (màu xanh dương)
   - In toàn bộ danh sách để tham khảo/lưu trữ
   - Tự động hiển thị checkbox trống để đánh dấu tay

### Tối ưu cho in ấn:

#### ✅ Format chuẩn A4
- Margin tự động 15mm
- Font chữ dễ đọc (Segoe UI)
- Layout tối ưu: không bị cắt nội dung giữa trang

#### ✅ Thông tin đầy đủ
- Header: Tiêu đề, loại checklist, ngày giờ in
- Nội dung: Tình huống, công cụ, kỹ năng, mức độ ưu tiên
- Footer: Thông tin bản quyền, ghi chú lưu trữ

#### ✅ Checkbox in rõ nét
- ☐ Checkbox trống: Để đánh dấu tay
- ☑ Checkbox đã tick: Đã chuẩn bị

#### ✅ Mức độ ưu tiên màu sắc
- 🔴 BẮT BUỘC - Cực kỳ quan trọng
- 🟠 QUAN TRỌNG - Rất cần thiết
- 🟡 NÊN CÓ - Nên chuẩn bị
- ⚪ TÙY CHỌN - Bổ sung khi có điều kiện

### Lưu PDF:

**Windows/Linux:**
- Ctrl + P → Chọn "Save as PDF" → Lưu

**Mac:**
- Cmd + P → Chọn "Save as PDF" → Lưu

**Mobile:**
- Menu (⋮) → Print → Save as PDF

### Tips lưu trữ:
1. ✅ In ra giấy → Để trong túi khẩn cấp (Go Bag)
2. ✅ Lưu PDF → Cloud Drive (Google Drive, Dropbox)
3. ✅ Lưu PDF → USB dự phòng
4. ✅ Print nhiều bản → Phân phối gia đình, xe hơi, văn phòng

## 🚀 Nâng cấp tương lai

### Features có thể thêm:
- [x] Print-friendly version (✅ Đã hoàn thành)
- [x] Export PDF (✅ Đã hoàn thành)
- [ ] Export/Import checklist (JSON)
- [ ] PWA (Progressive Web App) - offline full
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Share checklist qua URL
- [ ] Backup to cloud (Firebase/Supabase)

### Advanced options:
```javascript
// Thêm vào app.js để export data
function exportData() {
    const data = {
        checkedItems,
        exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)],
        { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survival-checklist-backup.json';
    a.click();
}
```

## 📄 License

MIT License - **Free to use, modify, and distribute**

This project is open source and available to anyone who needs it. See [LICENSE](LICENSE) for details.

### You can:
- ✅ Use for personal or commercial purposes
- ✅ Modify and adapt to your needs
- ✅ Share with anyone who might benefit
- ✅ Translate to other languages
- ✅ Create derivative works

We only ask that you keep the license notice and use it to help others! 🛡️

## 👨‍💻 Author

**Alan Pham** (vietpham8)
- Portfolio: [viet.zone](https://viet.zone)
- GitHub: [github.com/vietpham8](https://github.com/vietpham8)
- Repository: [old-but-gold-survival](https://github.com/vietpham8/old-but-gold-survival)

## 🙏 Credits

- **Tailwind CSS** - UI Framework
- **Heroicons** - SVG Icons
- **LocalStorage API** - Data persistence

---

## 📞 Support

Có vấn đề? Tạo issue trên GitHub hoặc liên hệ qua email.

**Happy Surviving! 🛡️**
