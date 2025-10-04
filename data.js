// ===== CẤU HÌNH TÌNH HUỐNG =====
const scenarios = {
    car: { name: "🚗 Xe hơi", color: "blue", desc: "Xe hư khu vực vắng, xe sa lầy/sình, tai nạn, lạc đường" },
    motorbike: { name: "🏍️ Xe máy", color: "sky", desc: "Xe hư giữa đường, tai nạn, lạc đường" },
    home: { name: "🏠 Gia đình", color: "green", desc: "Cúp điện/nước nhiều ngày, thiên tai, khẩn cấp y tế" },
    outdoor: { name: "⛰️ Phượt/Rừng", color: "orange", desc: "Lạc trong rừng, thời tiết xấu, động vật hoang dã" },
    financial: { name: "💰 Tài chính", color: "purple", desc: "Hết tiền mặt, không chuyển khoản, mất thẻ/ví" },
    financialEmergency: { name: "🔐 Khẩn cấp Tài chính", color: "emerald", desc: "Người quản lý tài chính mất khả năng, không truy cập tài sản/nợ" },
    laptopEmergency: { name: "💻 Laptop/Online", color: "violet", desc: "Laptop hỏng/hết pin, mất internet, phải online đúng giờ" },
    flood: { name: "🌊 Lũ lụt", color: "cyan", desc: "Nước dâng nhanh, nhà ngập, di chuyển vùng ngập" },
    storm: { name: "🌪️ Bão/Mưa", color: "indigo", desc: "Bão đổ bộ, mưa nhiều ngày liên tục, gió lớn" },
    landslide: { name: "⛰️ Sạt lở", color: "amber", desc: "Đất đá sạt lở, đường bị chặn, nguy cơ sập" },
    war: { name: "⚔️ Chiến tranh", color: "red", desc: "Xung đột vũ trang, bom đạn, thiếu hụt nguồn lực" },
    evacuation: { name: "🏃 Sơ tán khẩn cấp", color: "yellow", desc: "Di chuyển nhanh trong đêm, bỏ nhà đột ngột" },
    riot: { name: "🔥 Bạo loạn", color: "rose", desc: "Biểu tình bạo lực, đụng độ, hỗn loạn đường phố" },
    earthquake: { name: "🌋 Động đất", color: "stone", desc: "Rung lắc đất, sập nhà, dư chấn" },
    fire: { name: "🔥 Cháy nhà", color: "red", desc: "Hỏa hoạn, khói độc, thoát hiểm" }
};

// ===== DANH SÁCH CÔNG CỤ HOÀN CHỈNH =====
const tools = {
    car: [
        { name: "Dây cáp kích điện (Jumper Cables)", priority: "critical", reason: "Ắc quy yếu/hết" },
        { name: "Bộ dụng cụ sửa xe cơ bản (tua vít, kìm, cờ lê)", priority: "critical", reason: "Sửa chữa khẩn cấp" },
        { name: "Dao đa năng/Multi-tool", priority: "critical", reason: "Cắt, cứu hộ, sửa chữa" },
        { name: "Đèn pin cơ học/quay tay + pin dự phòng", priority: "critical", reason: "Chiếu sáng ban đêm" },
        { name: "Bộ sơ cứu (băng, gạc, thuốc sát trùng, kéo)", priority: "critical", reason: "Xử lý vết thương" },
        { name: "Dây kéo xe/Dây cáp chắc chắn", priority: "high", reason: "Kéo xe khi hư/sa lầy" },
        { name: "Xẻng gấp nhỏ", priority: "high", reason: "Đào bánh xe khi sa lầy" },
        { name: "Tấm gỗ/thảm chống trượt", priority: "high", reason: "Đặt dưới bánh khi sa lầy" },
        { name: "Bình cứu hỏa mini", priority: "high", reason: "Cháy xe" },
        { name: "Dây Paracord (5-10m)", priority: "high", reason: "Buộc, kéo, sửa chữa" },
        { name: "Búa thoát hiểm (đập kính)", priority: "high", reason: "Thoát khỏi xe khi bị kẹt" },
        { name: "La bàn cơ học", priority: "medium", reason: "GPS hết pin" },
        { name: "Bản đồ giấy khu vực", priority: "medium", reason: "Định hướng khi lạc" },
        { name: "Nước uống đóng chai (2-5 lít)", priority: "medium", reason: "Mắc kẹt lâu" },
        { name: "Bánh năng lượng/Thực phẩm khô", priority: "medium", reason: "Đói khi mắc kẹt" },
        { name: "Chăn/áo mưa khẩn cấp", priority: "medium", reason: "Giữ ấm, che mưa" },
        { name: "Còi/Đèn báo hiệu", priority: "medium", reason: "Gọi cứu hộ" },
        { name: "Bơm lốp mini/bình xịt vá lốp", priority: "medium", reason: "Lốp xẹp nhẹ" },
        { name: "Găng tay bảo hộ", priority: "low", reason: "Bảo vệ tay khi sửa xe" },
        { name: "Ống hút xăng", priority: "low", reason: "Hết xăng vắng cây xăng" }
    ],

    motorbike: [
        { name: "Bộ dụng cụ sửa xe nhỏ gọn", priority: "critical", reason: "Sửa chữa cơ bản" },
        { name: "Dây kéo xe", priority: "critical", reason: "Kéo xe khi hư" },
        { name: "Bộ vá săm lốp", priority: "critical", reason: "Lốp xẹp" },
        { name: "Bình xịt vá lốp khẩn cấp", priority: "high", reason: "Vá nhanh trên đường" },
        { name: "Bật lửa + Dây điện", priority: "high", reason: "Kiểm tra lửa xe" },
        { name: "Bộ sơ cứu nhỏ gọn", priority: "high", reason: "Tai nạn, vết thương" },
        { name: "Đèn pin nhỏ", priority: "medium", reason: "Chiếu sáng sửa xe đêm" },
        { name: "Áo mưa gấp gọn", priority: "medium", reason: "Mưa bất ngờ" },
        { name: "Găng tay sửa xe", priority: "low", reason: "Bảo vệ tay" }
    ],

    home: [
        { name: "Đèn pin quay tay/năng lượng mặt trời", priority: "critical", reason: "Cúp điện dài ngày" },
        { name: "Nến + Diêm/Bật lửa chống gió", priority: "critical", reason: "Chiếu sáng, nấu ăn" },
        { name: "Radio pin/quay tay", priority: "critical", reason: "Nghe tin tức khi mất điện/mạng" },
        { name: "Pin sạc dự phòng lớn (20,000mAh+)", priority: "critical", reason: "Sạc điện thoại" },
        { name: "Nước đóng chai/Can chứa (20-50 lít)", priority: "critical", reason: "Cúp nước nhiều ngày" },
        { name: "Viên lọc nước/Bình lọc di động", priority: "critical", reason: "Lọc nước bẩn" },
        { name: "Bộ sơ cứu đầy đủ", priority: "critical", reason: "Y tế khẩn cấp" },
        { name: "Thuốc thường dùng (dự trữ 1-2 tháng)", priority: "critical", reason: "Bệnh mãn tính" },
        { name: "Bếp gas mini/Bếp cồn", priority: "high", reason: "Nấu ăn khi cúp điện" },
        { name: "Thực phẩm khô (mì, gạo, đồ hộp)", priority: "high", reason: "Dự trữ 5-7 ngày" },
        { name: "Dao đa năng/Kéo/Mở hộp", priority: "high", reason: "Chuẩn bị thực phẩm" },
        { name: "Dây thừng chắc chắn (10-20m)", priority: "high", reason: "Buộc đồ, cứu hộ" },
        { name: "Bạt nhựa/Túi nilon lớn", priority: "high", reason: "Che mưa, chứa nước" },
        { name: "Xô/Chậu/Can nhựa", priority: "high", reason: "Chứa nước dự trữ" },
        { name: "Máy lọc không khí/Khẩu trang N95", priority: "medium", reason: "Khói, bụi, dịch bệnh" },
        { name: "Quạt pin/quay tay", priority: "medium", reason: "Nóng khi cúp điện" },
        { name: "Bình chữa cháy", priority: "medium", reason: "Cháy nhà" },
        { name: "Ống nước dài (10-20m)", priority: "medium", reason: "Lấy nước từ xa" },
        { name: "Giấy vệ sinh (dự trữ)", priority: "medium", reason: "Vệ sinh cá nhân" },
        { name: "Xà phòng/Nước sát khuẩn tay", priority: "medium", reason: "Vệ sinh" },
        { name: "Ắc quy dự phòng/Máy phát điện mini", priority: "low", reason: "Nguồn điện dự phòng" },
        { name: "Bộ đàm/Máy bộ đàm", priority: "low", reason: "Liên lạc khi mất mạng" }
    ],

    outdoor: [
        { name: "Dao sinh tồn/Machete", priority: "critical", reason: "Chặt cây, tự vệ, săn bắt" },
        { name: "Bật lửa + Diêm chống nước + Fire starter", priority: "critical", reason: "Đốt lửa sưởi ấm, nấu ăn" },
        { name: "Bình lọc nước/Viên lọc nước", priority: "critical", reason: "Nước sạch" },
        { name: "La bàn + Bản đồ địa hình", priority: "critical", reason: "Định hướng" },
        { name: "Dây Paracord (50-100m)", priority: "critical", reason: "Dựng lều, bẫy, leo trèo" },
        { name: "Bộ sơ cứu rừng (rắn cắn, vết thương)", priority: "critical", reason: "Y tế khẩn cấp" },
        { name: "Đèn pin đội đầu + Pin dự phòng", priority: "high", reason: "Chiếu sáng, di chuyển đêm" },
        { name: "Còi khẩn cấp + Gương báo hiệu", priority: "high", reason: "Kêu cứu" },
        { name: "Lều/Màn bạt chống nước", priority: "high", reason: "Trú ẩn" },
        { name: "Túi ngủ/Chăn nhiệt", priority: "high", reason: "Giữ ấm ban đêm" },
        { name: "Rìu cầm tay (Hatchet)", priority: "high", reason: "Chặt củi" },
        { name: "Thực phẩm năng lượng cao", priority: "high", reason: "Dinh dưỡng" },
        { name: "Viên muối kháng sinh/Thuốc chống sốt rét", priority: "medium", reason: "Phòng bệnh" },
        { name: "Lưới câu cá/Dây câu", priority: "medium", reason: "Kiếm thức ăn" },
        { name: "Dao nhỏ đa năng", priority: "medium", reason: "Cắt, gọt, sửa chữa" },
        { name: "Áo mưa/Áo khoác chống nước", priority: "medium", reason: "Giữ khô" },
        { name: "Ống nhòm nhỏ", priority: "low", reason: "Quan sát địa hình" },
        { name: "Dây thoát hiểm/Leo núi", priority: "low", reason: "Vượt vách đá, suối" },
        { name: "Bẫy động vật nhỏ", priority: "low", reason: "Săn bắt" }
    ],

    financial: [
        { name: "Tiền mặt nhỏ (20k, 50k, 100k) giấu nhiều nơi", priority: "critical", reason: "Khẩn cấp, không ATM" },
        { name: "Vàng nhỏ (chỉ, nhẫn) dễ bán", priority: "critical", reason: "Tài sản thanh khoản" },
        { name: "Thẻ tín dụng dự phòng (khác ngân hàng chính)", priority: "high", reason: "Thẻ chính bị khóa" },
        { name: "Danh bạ số điện thoại quan trọng (giấy)", priority: "high", reason: "Mất điện thoại" },
        { name: "Photocopy CMND/CCCD/Passport", priority: "high", reason: "Mất giấy tờ gốc" },
        { name: "Sổ tiết kiệm/Tài khoản ngân hàng dự phòng", priority: "high", reason: "Tài khoản chính bị khóa" },
        { name: "Đồ có giá trị nhỏ dễ cầm đồ", priority: "medium", reason: "Đổi tiền mặt nhanh" },
        { name: "Thẻ ATM nhiều ngân hàng khác nhau", priority: "medium", reason: "Một ngân hàng lỗi hệ thống" },
        { name: "Ví điện tử đa dạng (Momo, ZaloPay, VNPay...)", priority: "medium", reason: "Một ví lỗi" },
        { name: "Sim điện thoại dự phòng (nhà mạng khác)", priority: "medium", reason: "Mạng chính lỗi" },
        { name: "Tài liệu vay mượn khẩn cấp", priority: "low", reason: "Cần tiền gấp" },
        { name: "Danh sách người có thể vay nợ", priority: "low", reason: "Tình huống cực khẩn" }
    ],

    financialEmergency: [
        { name: "Sổ thông tin tài chính khẩn cấp (giấy + số)", priority: "critical", reason: "Tập trung mọi thông tin quan trọng" },
        { name: "Photocopy giấy tờ ngân hàng, sổ tiết kiệm", priority: "critical", reason: "Truy cập tài khoản" },
        { name: "Danh sách tài khoản + số dư ước tính", priority: "critical", reason: "Biết có bao nhiêu tiền" },
        { name: "Danh sách khoản nợ đang có", priority: "critical", reason: "Biết phải trả ai, bao nhiêu" },
        { name: "Giấy ủy quyền tài chính (có công chứng)", priority: "critical", reason: "Người khác truy cập hợp pháp" },
        { name: "Két sắt/Túi tài liệu chống cháy", priority: "critical", reason: "Bảo vệ giấy tờ quan trọng" },
        { name: "Danh sách người thụ hưởng bảo hiểm", priority: "high", reason: "Nhận tiền bảo hiểm" },
        { name: "Hợp đồng bảo hiểm nhân thọ", priority: "high", reason: "Yêu cầu chi trả" },
        { name: "Sổ đỏ/Sổ hồng (photocopy)", priority: "high", reason: "Chứng minh tài sản" },
        { name: "Danh bạ luật sư/kế toán/ngân hàng", priority: "high", reason: "Liên hệ khẩn cấp" },
        { name: "USB/Cloud backup thông tin tài chính", priority: "high", reason: "Dự phòng mất giấy tờ" },
        { name: "Điện thoại dự phòng (SIM khác)", priority: "high", reason: "Liên lạc khi mất điện thoại chính" },
        { name: "Hộp kim loại chống cháy/nước", priority: "medium", reason: "Bảo vệ tài liệu lâu dài" },
        { name: "Di chúc (nếu có)", priority: "medium", reason: "Phân chia tài sản hợp pháp" },
        { name: "Giấy chứng nhận doanh nghiệp", priority: "medium", reason: "Quản lý tài sản công ty" },
        { name: "Hợp đồng cho vay (bản gốc)", priority: "medium", reason: "Thu hồi nợ" }
    ],

    laptopEmergency: [
        { name: "Pin sạc dự phòng laptop (20,000-50,000mAh, PD 65W+)", priority: "critical", reason: "Laptop hết pin giữa đường" },
        { name: "Sạc laptop + dây cáp dự phòng", priority: "critical", reason: "Sạc chính hỏng/quên" },
        { name: "SIM 4G/5G data lớn (100GB+)", priority: "critical", reason: "Hotspot khi không có wifi" },
        { name: "Cloud sync tự động (Google Drive/Dropbox)", priority: "critical", reason: "Backup realtime" },
        { name: "USB backup 64GB-256GB", priority: "critical", reason: "Backup code/database offline" },
        { name: "Password manager (Bitwarden/1Password)", priority: "critical", reason: "Truy cập tài khoản mọi nơi" },
        { name: "Laptop dự phòng (có thể cũ)", priority: "critical", reason: "Máy chính hỏng" },
        { name: "SIM dự phòng nhà mạng khác", priority: "high", reason: "Mạng chính lỗi" },
        { name: "External SSD 500GB-1TB", priority: "high", reason: "Backup đầy đủ mỗi tuần" },
        { name: "SSH keys backup (USB + Cloud mã hóa)", priority: "high", reason: "Truy cập server" },
        { name: "Balo chống sốc laptop", priority: "high", reason: "Bảo vệ khi di chuyển" },
        { name: "Adapter đa năng (Universal)", priority: "high", reason: "Sạc nhiều loại laptop" },
        { name: "USB 4G/5G Modem", priority: "high", reason: "Internet trực tiếp vào laptop" },
        { name: "Danh sách quán cafe/coworking có wifi", priority: "high", reason: "Nơi làm việc khẩn cấp" },
        { name: "Remote desktop software (TeamViewer/AnyDesk)", priority: "high", reason: "Truy cập máy từ xa" },
        { name: "Sạc xe hơi (Car inverter 150W-300W)", priority: "medium", reason: "Sạc trên xe" },
        { name: "Bàn phím + chuột Bluetooth dự phòng", priority: "medium", reason: "Bàn phím laptop hỏng" },
        { name: "HDMI cable", priority: "medium", reason: "Dùng TV làm màn hình" },
        { name: "Túi chống nước", priority: "medium", reason: "Mưa đột ngột" },
        { name: "Bootable USB với Linux + Dev tools", priority: "medium", reason: "Dùng trên máy bất kỳ" },
        { name: "VPN dự phòng", priority: "medium", reason: "Wifi công cộng chặn port" },
        { name: "Lock cable Kensington", priority: "low", reason: "Khóa laptop ở nơi công cộng" },
        { name: "Webcam cover", priority: "low", reason: "Bảo mật" },
        { name: "Privacy screen filter", priority: "low", reason: "Chống nhìn trộm" }
    ],

    flood: [
        { name: "Phao bơi/Áo phao", priority: "critical", reason: "Thoát lũ, không biết bơi" },
        { name: "Dây thừng dài (20-50m)", priority: "critical", reason: "Cứu hộ, kéo người" },
        { name: "Đèn pin chống nước", priority: "critical", reason: "Chiếu sáng ban đêm" },
        { name: "Còi khẩn cấp", priority: "critical", reason: "Kêu cứu khi bị mắc kẹt" },
        { name: "Bạt nhựa lớn", priority: "high", reason: "Che mưa, tránh nước" },
        { name: "Thực phẩm khô đóng kín", priority: "high", reason: "Ăn uống" },
        { name: "Nước uống đủ dùng", priority: "high", reason: "Nước bị nhiễm bẩn" },
        { name: "Giấy tờ quan trọng bọc nilon", priority: "high", reason: "Chống ướt" },
        { name: "Radio pin", priority: "medium", reason: "Nghe tin cảnh báo" },
        { name: "Túi khô chống nước", priority: "medium", reason: "Bảo vệ đồ" },
        { name: "Thuyền bơm hơi nhỏ", priority: "low", reason: "Di chuyển vùng ngập" }
    ],

    storm: [
        { name: "Băng keo dán cửa sổ", priority: "critical", reason: "Chống vỡ kính" },
        { name: "Bạt che mái nhà", priority: "critical", reason: "Mái bay" },
        { name: "Đèn pin + Pin dự phòng", priority: "critical", reason: "Mất điện" },
        { name: "Nước uống dự trữ", priority: "critical", reason: "Cúp nước" },
        { name: "Thực phẩm khô", priority: "critical", reason: "Không đi chợ được" },
        { name: "Radio pin", priority: "high", reason: "Cập nhật tin bão" },
        { name: "Bộ sơ cứu", priority: "high", reason: "Bị thương do bão" },
        { name: "Dây thừng chắc", priority: "high", reason: "Buộc đồ, cố định" },
        { name: "Túi nilon lớn", priority: "medium", reason: "Bọc đồ chống ướt" },
        { name: "Cưa/Rìu nhỏ", priority: "medium", reason: "Dọn cây đổ" }
    ],

    landslide: [
        { name: "Xẻng/Cuốc", priority: "critical", reason: "Đào bới đất đá" },
        { name: "Còi/Đèn báo hiệu", priority: "critical", reason: "Kêu cứu khi bị vùi" },
        { name: "Mũ cứng/Nón bảo hộ", priority: "critical", reason: "Bảo vệ đầu" },
        { name: "Dây thừng dài", priority: "high", reason: "Cứu hộ, kéo người" },
        { name: "Đèn pin mạnh", priority: "high", reason: "Chiếu sáng tìm người" },
        { name: "Bộ sơ cứu", priority: "high", reason: "Vết thương" },
        { name: "Radio cảnh báo", priority: "medium", reason: "Nghe tin sạt lở" },
        { name: "Giày bảo hộ chắc", priority: "medium", reason: "Di chuyển đất đá" }
    ],

    war: [
        { name: "Túi ba lô khẩn cấp (Go Bag)", priority: "critical", reason: "Di chuyển nhanh" },
        { name: "Nước uống (3-5 lít)", priority: "critical", reason: "Sinh tồn" },
        { name: "Thực phẩm khô (5-7 ngày)", priority: "critical", reason: "Dinh dưỡng" },
        { name: "Bộ sơ cứu chiến thương", priority: "critical", reason: "Vết thương nghiêm trọng" },
        { name: "Radio pin", priority: "critical", reason: "Tin tức an ninh" },
        { name: "Đèn pin đội đầu", priority: "high", reason: "Chiếu sáng tay rảnh" },
        { name: "Giấy tờ tùy thân (photocopy)", priority: "high", reason: "Kiểm tra" },
        { name: "Tiền mặt/Vàng", priority: "high", reason: "Tài sản di động" },
        { name: "Dao đa năng", priority: "high", reason: "Công cụ sinh tồn" },
        { name: "Bạt/Túi ngủ", priority: "medium", reason: "Trú ẩn tạm" },
        { name: "Khẩu trang N95", priority: "medium", reason: "Khói, hóa chất" },
        { name: "Bản đồ giấy", priority: "medium", reason: "Định hướng" }
    ],

    evacuation: [
        { name: "Giấy tờ tùy thân (CMND, Passport)", priority: "critical", reason: "Không đi được không có" },
        { name: "Thuốc cần thiết", priority: "critical", reason: "Bệnh mãn tính" },
        { name: "Túi ba lô sẵn sàng", priority: "critical", reason: "Lấy nhanh 5 phút" },
        { name: "Tiền mặt/Vàng", priority: "critical", reason: "Tài sản di động" },
        { name: "Đèn pin + Pin", priority: "high", reason: "Sơ tán đêm" },
        { name: "Nước + Thực phẩm khô", priority: "high", reason: "Ăn trên đường" },
        { name: "Quần áo thay đổi", priority: "high", reason: "Ở lâu ngoài" },
        { name: "Điện thoại + Sạc dự phòng", priority: "high", reason: "Liên lạc" },
        { name: "Bộ sơ cứu nhỏ", priority: "medium", reason: "Y tế cơ bản" },
        { name: "Chăn/Túi ngủ gọn", priority: "medium", reason: "Ngủ tạm" }
    ],

    riot: [
        { name: "Khẩu trang N95/P100", priority: "critical", reason: "Hơi cay, khói" },
        { name: "Kính bảo hộ chống va đập", priority: "critical", reason: "Bảo vệ mắt" },
        { name: "Nước muối sinh lý", priority: "critical", reason: "Rửa mắt hơi cay" },
        { name: "Áo khoác dài tay", priority: "high", reason: "Che da, nhận diện" },
        { name: "Giày chạy bộ tốt", priority: "high", reason: "Thoát nhanh" },
        { name: "Bản đồ thoát hiểm", priority: "high", reason: "Lối thoát thay thế" },
        { name: "Pin sạc dự phòng", priority: "medium", reason: "Liên lạc" },
        { name: "Nước uống", priority: "medium", reason: "Giữ sức" },
        { name: "Bộ sơ cứu nhỏ", priority: "medium", reason: "Vết thương nhẹ" }
    ],

    earthquake: [
        { name: "Túi ba lô khẩn cấp (Go Bag)", priority: "critical", reason: "Sẵn sàng thoát" },
        { name: "Đèn pin + Pin", priority: "critical", reason: "Mất điện" },
        { name: "Còi báo hiệu", priority: "critical", reason: "Kêu cứu khi bị vùi" },
        { name: "Nước + Thực phẩm (3 ngày)", priority: "critical", reason: "Bị mắc kẹt" },
        { name: "Bộ sơ cứu", priority: "high", reason: "Vết thương" },
        { name: "Radio pin", priority: "high", reason: "Tin dư chấn" },
        { name: "Mũ cứng", priority: "high", reason: "Bảo vệ đầu" },
        { name: "Giày bảo hộ", priority: "medium", reason: "Di chuyển đổ nát" },
        { name: "Xẻng nhỏ", priority: "medium", reason: "Đào bới" }
    ],

    fire: [
        { name: "Bình cứu hỏa", priority: "critical", reason: "Dập lửa ban đầu" },
        { name: "Chăn chữa cháy", priority: "critical", reason: "Dập lửa, bọc người" },
        { name: "Khẩu trang ướt", priority: "critical", reason: "Lọc khói" },
        { name: "Đèn pin", priority: "high", reason: "Thoát hiểm tối" },
        { name: "Thang dây thoát hiểm", priority: "high", reason: "Nhà cao tầng" },
        { name: "Búa thoát hiểm", priority: "high", reason: "Đập cửa sổ" },
        { name: "Bản đồ lối thoát", priority: "medium", reason: "Định hướng khói mù" },
        { name: "Bộ sơ cứu bỏng", priority: "medium", reason: "Vết bỏng" }
    ]
};

// ===== MINDSET SINH TỒN =====
const mindsets = {
    // Mindset chung cho mọi tình huống
    general: [
        { quote: "Giữ bình tĩnh là giữ mạng", meaning: "Trong khủng hoảng, người bình tĩnh nhất thường đưa ra quyết định tốt nhất. Hít thở sâu, đếm đến 10 trước khi hành động." },
        { quote: "Ưu tiên theo thứ tự: An toàn - Ổn định - Giải quyết", meaning: "Đảm bảo an toàn trước, ổn định tình hình sau, rồi mới tìm giải pháp lâu dài." },
        { quote: "Làm việc với những gì có, không than vãn những gì thiếu", meaning: "Tập trung vào nguồn lực hiện có thay vì lãng phí thời gian tiếc nuối." },
        { quote: "Một bước nhỏ đúng hướng tốt hơn mười bước vội vàng", meaning: "Hành động có kiểm soát luôn hiệu quả hơn phản ứng hoảng loạn." },
        { quote: "Trong cơ nguy có cơ hội", meaning: "Khủng hoảng thường mở ra những khả năng mới mà bình thường ta không nhìn thấy." },
        { quote: "Đoàn kết là sức mạnh", meaning: "Đừng cố gắng giải quyết mọi thứ một mình - biết khi nào cần và nhận giúp đỡ." },
        { quote: "Chuẩn bị khi trời nắng, đừng đợi đến lúc mưa", meaning: "Luôn có kế hoạch dự phòng trước khi khủng hoảng xảy ra." },
        { quote: "STOP: Stop-Think-Observe-Plan", meaning: "Dừng, Nghĩ, Quan sát, Lập kế hoạch" },
        { quote: "Luôn có Plan B, tốt nhất có cả Plan C", meaning: "Dự phòng nhiều kịch bản khác nhau" },
        { quote: "Chia sẻ kỹ năng, gấp đôi sức mạnh", meaning: "Học và dạy người thân" },
        { quote: "Bình thường luyện tập, khẩn cấp không loạn", meaning: "Thực hành thường xuyên để thuần thục" },
        { quote: "Sau khủng hoảng, rút kinh nghiệm ngay", meaning: "Ghi chép và cải thiện cho lần sau" }
    ],

    // Mindset theo từng tình huống
    car: [
        { quote: "Xe hỏng giữa đường, bình tĩnh nửa đường về", meaning: "Đỗ xe an toàn, bật đèn cảnh báo trước khi làm gì" },
        { quote: "Một sợi dây, một thanh gỗ có thể cứu cả ngày", meaning: "Luôn mang theo dụng cụ cơ bản" },
        { quote: "Sa lầy đừng đạp ga, càng đạp càng sa", meaning: "Dừng ngay, đánh giá, tìm vật lót bánh xe" },
        { quote: "Điện thoại còn pin là còn hy vọng", meaning: "Luôn có sạc dự phòng trong xe" }
    ],

    motorbike: [
        { quote: "Xe máy đường dài, dụng cụ cơ bản theo chân", meaning: "Luôn mang bộ vá săm và dây kéo" },
        { quote: "Lốp xẹp đừng đi tiếp, càng đi càng hỏng vành", meaning: "Dừng ngay và xử lý" },
        { quote: "Xe số sợ mất lửa, xe ga sợ hết dầu", meaning: "Kiểm tra trước khi đi xa" }
    ],

    home: [
        { quote: "Nước tích trữ 3 ngày, lương khô 1 tuần", meaning: "Luôn có dự trữ tối thiểu" },
        { quote: "Một ngọn nến sáng hơn ngàn lời than", meaning: "Chuẩn bị đèn pin, nến, diêm sẵn" },
        { quote: "Nước đục thì gạn, nước bẩn thì đun", meaning: "Biết cách xử lý nước cơ bản" },
        { quote: "Tủ lạnh đóng kín giữ lạnh 48 giờ", meaning: "Đừng mở tủ lạnh không cần thiết khi mất điện" }
    ],

    outdoor: [
        { quote: "Ba điều sống còn: Nơi trú, nước, lửa", meaning: "Ưu tiên theo thứ tự này" },
        { quote: "Ở lại và làm cho mình dễ thấy", meaning: "Đừng lang thang khi lạc, tạo tín hiệu" },
        { quote: "Quy tắc 3: 3 phút không khí, 3 giờ không ấm, 3 ngày không nước, 3 tuần không ăn", meaning: "Thứ tự ưu tiên sinh tồn" },
        { quote: "Luôn cho người thân biết lịch trình", meaning: "Ai đó biết bạn ở đâu là cơ hội được cứu" }
    ],

    financial: [
        { quote: "Cắt ngay những gì không thiết yếu", meaning: "Phân biệt 'cần' và 'muốn'" },
        { quote: "Một đồng kiếm được, hai đồng phải giữ", meaning: "Tiết kiệm ngay cả khi khó khăn" },
        { quote: "Mất tiền còn đủ sức kiếm, mất sức khó kiếm tiền", meaning: "Ưu tiên sức khỏe" },
        { quote: "Nợ xấu giải quyết trước, nợ tốt từ từ tính", meaning: "Ưu tiên trả nợ lãi cao" }
    ],

    financialEmergency: [
        { quote: "Thông tin tài chính phải ít nhất 2 người biết", meaning: "Tránh rủi ro một người nắm hết" },
        { quote: "Giấy tờ quan trọng lưu 3 nơi: Nhà + Két ngân hàng + Người tin cậy", meaning: "Dự phòng mất mát" },
        { quote: "Cập nhật thông tin tài chính 6 tháng/lần", meaning: "Thông tin luôn chính xác" },
        { quote: "Ủy quyền từ hôm nay, khẩn cấp không loạn", meaning: "Chuẩn bị trước khi cần" },
        { quote: "Người chết mất 1 người, gia đình mù tài chính mất cả nhà", meaning: "Hậu quả nghiêm trọng nếu không chuẩn bị" },
        { quote: "Sổ tiết kiệm, khoản nợ - phải ghi rõ ràng", meaning: "Danh sách đầy đủ, chi tiết" },
        { quote: "Mật khẩu ngân hàng nên có hint, không để bí mật tuyệt đối", meaning: "Cân bằng bảo mật và truy cập khẩn cấp" },
        { quote: "Bảo hiểm phải biết người thụ hưởng", meaning: "Tránh mất quyền lợi" }
    ],

    laptopEmergency: [
        { quote: "Code chưa push = code chưa tồn tại", meaning: "Commit và push liên tục lên Git" },
        { quote: "Backup 3-2-1: 3 bản, 2 phương tiện, 1 offsite", meaning: "Luôn an toàn dữ liệu" },
        { quote: "Laptop là công cụ, cloud là tài sản", meaning: "Mọi thứ quan trọng phải lên cloud" },
        { quote: "Pin còn 20% = Tìm nguồn điện ngay", meaning: "Không để hết pin đột ngột" },
        { quote: "Luôn có Plan B: laptop dự phòng hoặc cloud workspace", meaning: "Sẵn sàng chuyển đổi" },
        { quote: "Cứ 30 phút Ctrl+S, cứ 1 giờ commit", meaning: "Thói quen tốt cứu mạng" },
        { quote: "Laptop mất được, data mất là chết", meaning: "Ưu tiên backup hơn thiết bị" },
        { quote: "Biết xử lý qua điện thoại = Sống còn", meaning: "SSH mobile là cứu cánh" },
        { quote: "Wifi công cộng + VPN = An toàn", meaning: "Bảo mật luôn luôn" },
        { quote: "Mọi config đều version control", meaning: "Git cho cả file config" }
    ],

    flood: [
        { quote: "Nước lũ một tấc, xe hơi bỏ ngay", meaning: "15cm nước có thể cuốn xe" },
        { quote: "Leo cao trước, lo của sau", meaning: "Tính mạng quan trọng hơn tài sản" },
        { quote: "Nước rút độc hơn nước dâng", meaning: "Cẩn thận dịch bệnh sau lũ" },
        { quote: "Điện nước không pha trộn", meaning: "Cúp cầu dao điện trước khi nước vào nhà" }
    ],

    storm: [
        { quote: "Gió level 8 ở nhà, level 10 xuống hầm", meaning: "Biết khi nào cần trú ẩn" },
        { quote: "Cây to gốc lớn xa lánh, nhà yếu mái tôn tránh né", meaning: "Tránh xa vật dễ đổ" },
        { quote: "Pin đèn đầy, nước sạch đủ, lương khô có", meaning: "Bộ ba thiết yếu" },
        { quote: "Cửa sổ băng dính chữ X", meaning: "Giảm nguy cơ vỡ kính bay" }
    ],

    landslide: [
        { quote: "Đất nứt nẻ, cây nghiêng ngả - dấu hiệu chạy ngay", meaning: "Nhận biết sớm để thoát" },
        { quote: "Chạy ngang sườn, không chạy xuống", meaning: "Thoát theo hướng vuông góc" },
        { quote: "Tiếng đất rạn, nước đục bất thường - sơ tán ngay", meaning: "Dấu hiệu sạt lở sắp xảy ra" },
        { quote: "Không về nhà sau sạt lở 72 giờ", meaning: "Nguy cơ sạt tiếp theo" }
    ],

    war: [
        { quote: "Tránh đám đông, lánh nơi chiến lược", meaning: "Ga, sân bay, trụ sở là mục tiêu" },
        { quote: "Im lặng là vàng, kín đáo là sống", meaning: "Không khoe tài sản, thức ăn" },
        { quote: "Một túi go-bag sẵn sàng", meaning: "Giấy tờ, tiền mặt, thuốc men 72 giờ" },
        { quote: "Tin chính thống, không tin đồn", meaning: "Nghe đài chính thức" }
    ],

    evacuation: [
        { quote: "5 phút chuẩn bị tốt hơn 5 giờ hối tiếc", meaning: "Có sẵn túi sơ tán" },
        { quote: "Giấy tờ - Thuốc - Tiền - Nước - Thức ăn", meaning: "Thứ tự ưu tiên" },
        { quote: "Đi sớm đi nhẹ nhàng, đi muộn kẹt đường", meaning: "Sơ tán ngay khi có lệnh" },
        { quote: "Một điểm tập kết cả nhà biết", meaning: "Nơi gặp nhau khi thất lạc" }
    ],

    riot: [
        { quote: "Tránh xa đám đông là tránh xa nguy hiểm", meaning: "Không tham gia hoặc xem gần" },
        { quote: "Đường chính tắc, lối phụ thoát", meaning: "Luôn biết lối thoát thay thế" },
        { quote: "Kín mặt, kín người, kín tài sản", meaning: "Không gây chú ý" },
        { quote: "Về nhà an toàn hơn xem thêm 5 phút", meaning: "Rời khỏi ngay khi có dấu hiệu" }
    ],

    earthquake: [
        { quote: "Rung to chui gầm bàn, rung nhỏ ra khỏi nhà", meaning: "Hành động phù hợp với cường độ" },
        { quote: "Tam giác sống còn", meaning: "Cạnh đồ vật lớn là nơi an toàn khi sập" },
        { quote: "Dừng-Úp-Bám (Drop-Cover-Hold)", meaning: "Động tác cơ bản khi động đất" },
        { quote: "Sau rung lắc, xa thang máy", meaning: "Dùng cầu thang để thoát" }
    ],

    fire: [
        { quote: "Khói thấy cúi người, lửa gặp quay lưng", meaning: "Bò thấp dưới khói" },
        { quote: "Sờ cửa trước khi mở", meaning: "Cửa nóng = lửa bên kia" },
        { quote: "Ra ngoài, ở ngoài", meaning: "Không quay lại vì bất cứ thứ gì" },
        { quote: "Lửa nhỏ dập ngay, lửa to chạy thẳng", meaning: "Biết giới hạn khả năng" }
    ]
};

// ===== DANH SÁCH KỸ NĂNG HOÀN CHỈNH =====
const skills = {
    car: [
        { name: "Sơ cứu cơ bản (CPR, băng bó)", priority: "critical", reason: "Cứu người bị thương" },
        { name: "Thay lốp xe", priority: "critical", reason: "Lốp xẹp" },
        { name: "Kích điện ắc quy", priority: "critical", reason: "Xe không nổ máy" },
        { name: "Đọc bản đồ giấy", priority: "high", reason: "GPS hỏng" },
        { name: "Xử lý xe sa lầy cơ bản", priority: "high", reason: "Thoát khỏi bùn/cát" },
        { name: "Báo hiệu SOS bằng còi/đèn", priority: "medium", reason: "Gọi cứu hộ" },
        { name: "Kiểm tra dầu/nước làm mát", priority: "medium", reason: "Bảo dưỡng khẩn cấp" }
    ],

    motorbike: [
        { name: "Vá săm lốp xe máy", priority: "critical", reason: "Lốp xẹp" },
        { name: "Kiểm tra lửa xe", priority: "critical", reason: "Xe không nổ" },
        { name: "Sơ cứu tai nạn xe máy", priority: "critical", reason: "Vết thương" },
        { name: "Đẩy xe một mình", priority: "high", reason: "Xe hư giữa đường" },
        { name: "Thay dây curoa đứt", priority: "medium", reason: "Xe số tự động" }
    ],

    home: [
        { name: "Sơ cứu cơ bản (CPR, Heimlich)", priority: "critical", reason: "Cứu mạng" },
        { name: "Đun nước bằng lửa/nắng", priority: "critical", reason: "Khử trùng nước" },
        { name: "Tiết kiệm nước/Tái sử dụng", priority: "high", reason: "Cúp nước" },
        { name: "Nấu ăn không điện", priority: "high", reason: "Cúp điện" },
        { name: "Phân biệt thực phẩm hỏng", priority: "medium", reason: "Tránh ngộ độc" },
        { name: "Làm lọc nước đơn giản", priority: "medium", reason: "Lọc nước bẩn" },
        { name: "Tiết kiệm pin điện thoại", priority: "medium", reason: "Liên lạc lâu dài" }
    ],

    outdoor: [
        { name: "Đốt lửa không diêm", priority: "critical", reason: "Sưởi ấm, nấu ăn" },
        { name: "Tìm/Lọc nước trong tự nhiên", priority: "critical", reason: "Nước uống" },
        { name: "Dựng trại tạm", priority: "critical", reason: "Trú ẩn" },
        { name: "Định hướng bằng mặt trời/sao", priority: "critical", reason: "Không có la bàn" },
        { name: "Sơ cứu vết thương/rắn cắn", priority: "critical", reason: "Y tế rừng" },
        { name: "Tìm thức ăn trong rừng", priority: "high", reason: "Sinh tồn" },
        { name: "Làm bẫy động vật nhỏ", priority: "high", reason: "Săn bắt" },
        { name: "Buộc dây thừng cơ bản", priority: "high", reason: "Leo trèo, cứu hộ" },
        { name: "Báo hiệu cứu hộ", priority: "medium", reason: "Thu hút cứu hộ" },
        { name: "Phân biệt cây độc/ăn được", priority: "medium", reason: "Tránh ngộ độc" }
    ],

    financial: [
        { name: "Quản lý tiền mặt khẩn cấp", priority: "critical", reason: "Ưu tiên chi tiêu" },
        { name: "Thương lượng/Trả giá", priority: "high", reason: "Mua bán khẩn cấp" },
        { name: "Giấu tiền an toàn", priority: "high", reason: "Tránh mất trộm" },
        { name: "Vay mượn khẩn cấp", priority: "medium", reason: "Cần tiền gấp" },
        { name: "Đánh giá giá trị vàng cơ bản", priority: "medium", reason: "Tránh bị lừa" },
        { name: "Phân chia tài sản di chuyển", priority: "medium", reason: "Không để hết một chỗ" }
    ],

    financialEmergency: [
        { name: "Truy cập internet banking (ít nhất 1 người)", priority: "critical", reason: "Quản lý tài khoản online" },
        { name: "Đọc sổ tiết kiệm/Giấy tờ ngân hàng", priority: "critical", reason: "Hiểu thông tin tài chính" },
        { name: "Liên hệ ngân hàng/Luật sư khẩn cấp", priority: "critical", reason: "Tư vấn pháp lý nhanh" },
        { name: "Xác định tài sản ưu tiên thanh toán", priority: "critical", reason: "Tránh mất tài sản quan trọng" },
        { name: "Làm giấy ủy quyền tài chính", priority: "high", reason: "Hợp pháp hóa quyền truy cập" },
        { name: "Quản lý tiền mặt khẩn cấp", priority: "high", reason: "Chi tiêu hợp lý" },
        { name: "Xử lý khoản nợ đến hạn", priority: "high", reason: "Tránh lãi phạt" },
        { name: "Liên lạc với công ty bảo hiểm", priority: "high", reason: "Yêu cầu chi trả" },
        { name: "Đọc hợp đồng tài chính cơ bản", priority: "medium", reason: "Hiểu quyền lợi nghĩa vụ" },
        { name: "Tính toán dòng tiền gia đình", priority: "medium", reason: "Lập kế hoạch tài chính" },
        { name: "Phân loại tài sản/nợ ưu tiên", priority: "medium", reason: "Giải quyết đúng thứ tự" }
    ],

    laptopEmergency: [
        { name: "Làm việc qua SSH/Terminal", priority: "critical", reason: "Xử lý khi không có GUI" },
        { name: "Xử lý database qua CLI (psql/mysql/mongosh)", priority: "critical", reason: "Quản lý DB qua terminal" },
        { name: "Setup môi trường dev nhanh (Docker/script)", priority: "critical", reason: "Khôi phục máy mới trong 30 phút" },
        { name: "Git commit và push thường xuyên", priority: "critical", reason: "Backup code realtime" },
        { name: "Sử dụng cloud IDE (Codespaces/Gitpod)", priority: "high", reason: "Code trên browser khi laptop hỏng" },
        { name: "SSH từ điện thoại (Termius/JuiceSSH)", priority: "high", reason: "Xử lý khẩn cấp qua mobile" },
        { name: "Backup & restore database", priority: "high", reason: "Sao lưu và khôi phục DB" },
        { name: "Tìm wifi/điện nhanh trong 10 phút", priority: "high", reason: "Sinh tồn khi di chuyển" },
        { name: "Sử dụng hotspot 4G/5G", priority: "high", reason: "Internet dự phòng" },
        { name: "Code review qua điện thoại", priority: "medium", reason: "GitHub/GitLab mobile" },
        { name: "Troubleshooting laptop cơ bản", priority: "medium", reason: "Sửa lỗi đơn giản" },
        { name: "Remote desktop (TeamViewer/AnyDesk)", priority: "medium", reason: "Truy cập máy từ xa" },
        { name: "Quản lý password (Bitwarden/1Password)", priority: "medium", reason: "Truy cập tài khoản mọi nơi" },
        { name: "Khôi phục từ backup nhanh", priority: "medium", reason: "Restore data trong 1 giờ" }
    ],

    flood: [
        { name: "Bơi cơ bản/Nổi trên nước", priority: "critical", reason: "Thoát lũ" },
        { name: "Sơ cứu người đuối nước", priority: "critical", reason: "Cứu người" },
        { name: "Leo lên cao/Mái nhà", priority: "high", reason: "Thoát nước dâng" },
        { name: "Buộc dây cứu hộ", priority: "high", reason: "Kéo người" },
        { name: "Tìm điểm cao an toàn", priority: "medium", reason: "Trú ẩn" },
        { name: "Đọc mực nước dâng", priority: "medium", reason: "Dự đoán lũ" }
    ],

    storm: [
        { name: "Gia cố cửa sổ/Mái nhà", priority: "critical", reason: "Trước khi bão đến" },
        { name: "Tìm nơi trú ẩn an toàn trong nhà", priority: "critical", reason: "Tránh cửa sổ, mái" },
        { name: "Sơ cứu vết thương do bão", priority: "high", reason: "Y tế khẩn cấp" },
        { name: "Dọn cây đổ/Đồ vật", priority: "medium", reason: "Sau bão" },
        { name: "Nghe tin cảnh báo bão", priority: "medium", reason: "Chuẩn bị sớm" }
    ],

    landslide: [
        { name: "Nhận biết dấu hiệu sạt lở", priority: "critical", reason: "Thoát sớm" },
        { name: "Chạy vuông góc hướng sạt lở", priority: "critical", reason: "Thoát hiểm" },
        { name: "Sơ cứu người bị vùi", priority: "high", reason: "Cứu người" },
        { name: "Tìm điểm an toàn cao", priority: "high", reason: "Trú ẩn" },
        { name: "Kêu cứu hiệu quả", priority: "medium", reason: "Thu hút cứu hộ" }
    ],

    war: [
        { name: "Tìm nơi trú ẩn an toàn", priority: "critical", reason: "Tránh bom đạn" },
        { name: "Di chuyển trong bóng tối", priority: "critical", reason: "Tránh phát hiện" },
        { name: "Sơ cứu chiến thương", priority: "critical", reason: "Vết thương súng đạn" },
        { name: "Tìm nguồn nước/thức ăn", priority: "high", reason: "Sinh tồn dài hạn" },
        { name: "Đọc bản đồ/Định hướng", priority: "high", reason: "Di chuyển an toàn" },
        { name: "Phân biệt âm thanh vũ khí", priority: "medium", reason: "Đánh giá nguy hiểm" },
        { name: "Giao tiếp không lời", priority: "medium", reason: "Im lặng, an toàn" }
    ],

    evacuation: [
        { name: "Chuẩn bị túi khẩn cấp (Go Bag)", priority: "critical", reason: "Lấy nhanh 5 phút" },
        { name: "Lên kế hoạch thoát hiểm", priority: "critical", reason: "Biết đi đâu" },
        { name: "Di chuyển nhanh trong đêm", priority: "high", reason: "Sơ tán đột ngột" },
        { name: "Ưu tiên đồ dùng thiết yếu", priority: "high", reason: "Không mang nhiều" },
        { name: "Liên lạc gia đình", priority: "medium", reason: "Điểm hẹn" },
        { name: "Đọc bản đồ thoát hiểm", priority: "medium", reason: "Lối đi thay thế" }
    ],

    riot: [
        { name: "Tránh xa đám đông", priority: "critical", reason: "An toàn" },
        { name: "Tìm lối thoát an toàn", priority: "critical", reason: "Không bị kẹt" },
        { name: "Xử lý hơi cay (rửa mắt)", priority: "critical", reason: "Hồi phục" },
        { name: "Di chuyển sát tường/mép đường", priority: "high", reason: "Tránh giẫm đạp" },
        { name: "Nhận diện nguy hiểm", priority: "high", reason: "Tránh sớm" },
        { name: "Giữ bình tĩnh", priority: "medium", reason: "Quyết định đúng" }
    ],

    earthquake: [
        { name: "Nấp dưới bàn chắc chắn", priority: "critical", reason: "Bảo vệ đầu" },
        { name: "Tránh xa cửa sổ/vật dễ rơi", priority: "critical", reason: "An toàn" },
        { name: "Thoát khỏi nhà sau rung chấn", priority: "high", reason: "Tránh dư chấn" },
        { name: "Kiểm tra rò rỉ gas/điện", priority: "high", reason: "Phòng cháy nổ" },
        { name: "Sơ cứu người bị vùi", priority: "high", reason: "Cứu người" },
        { name: "Tìm không gian tam giác", priority: "medium", reason: "Trú ẩn khi sập" }
    ],

    fire: [
        { name: "Thoát thấp sát sàn", priority: "critical", reason: "Tránh khói độc" },
        { name: "Kiểm tra cửa nóng trước khi mở", priority: "critical", reason: "Tránh lửa bùng" },
        { name: "Gọi cứu hỏa 114", priority: "critical", reason: "Cứu hộ chuyên nghiệp" },
        { name: "Dập lửa ban đầu nhỏ", priority: "high", reason: "Ngăn cháy lan" },
        { name: "Đóng cửa chặn lửa", priority: "high", reason: "Làm chậm lan" },
        { name: "Sơ cứu bỏng", priority: "medium", reason: "Xử lý vết bỏng" },
        { name: "Tìm lối thoát thay thế", priority: "medium", reason: "Lối chính bị chặn" }
    ]
};
