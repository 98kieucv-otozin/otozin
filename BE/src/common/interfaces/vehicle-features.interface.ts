/**
 * Dimensions interface - Kích thước xe
 */
export interface Dimensions {
    length?: number; // Chiều dài (mm)
    width?: number; // Chiều rộng (mm)
    height?: number; // Chiều cao (mm)
    wheelbase?: number; // Chiều dài cơ sở (mm)
    ground_clearance?: number; // Khoảng sáng gầm (mm)
    front_track?: number; // Chiều rộng vết bánh trước (mm)
    rear_track?: number; // Chiều rộng vết bánh sau (mm)
    cargo_volume?: number; // Dung tích khoang hành lý (lít)
    fuel_tank_capacity?: number; // Dung tích bình xăng (lít)
}

/**
 * Performance interface - Hiệu suất xe
 */
export interface Performance {
    max_speed?: number; // Tốc độ tối đa (km/h)
    acceleration_0_100?: number; // Thời gian tăng tốc 0-100 km/h (giây)
    max_power?: number; // Công suất tối đa (hp hoặc kW)
    max_power_rpm?: number; // Vòng quay công suất tối đa (rpm)
    max_torque?: number; // Mô-men xoắn tối đa (Nm)
    max_torque_rpm?: number; // Vòng quay mô-men xoắn tối đa (rpm)
    fuel_consumption_urban?: number; // Mức tiêu thụ nhiên liệu đô thị (l/100km)
    fuel_consumption_highway?: number; // Mức tiêu thụ nhiên liệu đường trường (l/100km)
    fuel_consumption_combined?: number; // Mức tiêu thụ nhiên liệu kết hợp (l/100km)
    co2_emission?: number; // Lượng khí thải CO2 (g/km)
}

/**
 * SafetyFeatures interface - Tính năng an toàn
 */
export interface SafetyFeatures {
    airbags?: {
        front?: number; // Số túi khí phía trước
        side?: number; // Số túi khí bên
        curtain?: number; // Số túi khí rèm
        knee?: number; // Số túi khí đầu gối
        total?: number; // Tổng số túi khí
    };
    abs?: boolean; // Hệ thống chống bó cứng phanh
    ebd?: boolean; // Phân phối lực phanh điện tử
    ba?: boolean; // Hỗ trợ phanh khẩn cấp
    tcs?: boolean; // Hệ thống kiểm soát lực kéo
    esp?: boolean; // Hệ thống cân bằng điện tử
    hill_start_assist?: boolean; // Hỗ trợ khởi hành ngang dốc
    hill_descent_control?: boolean; // Kiểm soát tốc độ xuống dốc
    blind_spot_monitoring?: boolean; // Cảnh báo điểm mù
    lane_departure_warning?: boolean; // Cảnh báo lệch làn đường
    lane_keep_assist?: boolean; // Hỗ trợ giữ làn đường
    forward_collision_warning?: boolean; // Cảnh báo va chạm phía trước
    autonomous_emergency_braking?: boolean; // Phanh tự động khẩn cấp
    adaptive_cruise_control?: boolean; // Kiểm soát hành trình thích ứng
    rear_cross_traffic_alert?: boolean; // Cảnh báo giao thông phía sau
    parking_sensors?: {
        front?: boolean; // Cảm biến đỗ xe phía trước
        rear?: boolean; // Cảm biến đỗ xe phía sau
    };
    parking_camera?: {
        rear?: boolean; // Camera lùi
        front?: boolean; // Camera phía trước
        surround?: boolean; // Camera 360 độ
    };
    tire_pressure_monitoring?: boolean; // Giám sát áp suất lốp
    isofix?: boolean; // Ghế trẻ em ISOFIX
    other?: string[]; // Các tính năng an toàn khác
}

/**
 * ComfortFeatures interface - Tính năng tiện nghi và giải trí
 */
export interface ComfortFeatures {
    air_conditioning?: {
        type?: string; // Loại điều hòa (manual, automatic, dual_zone, tri_zone, quad_zone)
        rear?: boolean; // Điều hòa phía sau
        air_filter?: boolean; // Bộ lọc không khí
    };
    steering_wheel?: {
        material?: string; // Chất liệu vô lăng (leather, wood, etc.)
        adjustment?: string; // Điều chỉnh (manual, power, tilt_telescopic)
        heating?: boolean; // Sưởi vô lăng
    };
    seats?: {
        material?: string; // Chất liệu ghế (fabric, leather, alcantara, etc.)
        front_heating?: boolean; // Sưởi ghế trước
        rear_heating?: boolean; // Sưởi ghế sau
        front_ventilation?: boolean; // Thông gió ghế trước
        rear_ventilation?: boolean; // Thông gió ghế sau
        front_massage?: boolean; // Massage ghế trước
        memory?: boolean; // Nhớ vị trí ghế
        electric_adjustment?: boolean; // Điều chỉnh điện
    };
    infotainment?: {
        screen_size?: number; // Kích thước màn hình (inch)
        screen_type?: string; // Loại màn hình (touchscreen, etc.)
        apple_carplay?: boolean; // Apple CarPlay
        android_auto?: boolean; // Android Auto
        bluetooth?: boolean; // Bluetooth
        usb_ports?: number; // Số cổng USB
        wireless_charging?: boolean; // Sạc không dây
        navigation?: boolean; // Hệ thống dẫn đường
        wifi_hotspot?: boolean; // WiFi hotspot
    };
    audio?: {
        brand?: string; // Thương hiệu âm thanh
        speakers?: number; // Số loa
        subwoofer?: boolean; // Loa siêu trầm
    };
    sunroof?: {
        type?: string; // Loại cửa sổ trời (sunroof, moonroof, panoramic)
        electric?: boolean; // Điều khiển điện
    };
    keyless_entry?: boolean; // Vào xe không cần chìa khóa
    push_button_start?: boolean; // Khởi động bằng nút
    remote_start?: boolean; // Khởi động từ xa
    power_tailgate?: boolean; // Cửa cốp điện
    hands_free_liftgate?: boolean; // Mở cốp bằng chân
    ambient_lighting?: boolean; // Đèn nội thất
    other?: string[]; // Các tính năng tiện nghi khác
}

/**
 * InteriorFeatures interface - Tính năng nội thất
 */
export interface InteriorFeatures {
    dashboard?: {
        material?: string; // Chất liệu bảng điều khiển
        design?: string; // Thiết kế
    };
    upholstery?: {
        material?: string; // Chất liệu bọc ghế (fabric, leather, alcantara, etc.)
        color?: string; // Màu sắc
        pattern?: string; // Họa tiết
    };
    trim?: {
        material?: string; // Chất liệu ốp nội thất (wood, carbon, aluminum, etc.)
        finish?: string; // Hoàn thiện
    };
    storage?: {
        glove_box?: boolean; // Hộc đựng găng tay
        center_console?: boolean; // Hộc trung tâm
        door_pockets?: boolean; // Túi cửa
        cup_holders?: number; // Số giá đỡ cốc
    };
    mirrors?: {
        rearview_auto_dim?: boolean; // Gương chiếu hậu tự động chống chói
        side_electric?: boolean; // Gương bên điều khiển điện
        side_auto_fold?: boolean; // Gương bên tự động gập
        side_heating?: boolean; // Sưởi gương bên
    };
    lighting?: {
        ambient?: boolean; // Đèn nội thất
        reading_lights?: boolean; // Đèn đọc sách
        footwell?: boolean; // Đèn chân
    };
    other?: string[]; // Các tính năng nội thất khác
}

/**
 * ExteriorFeatures interface - Tính năng ngoại thất
 */
export interface ExteriorFeatures {
    headlights?: {
        type?: string; // Loại đèn pha (halogen, led, xenon, laser)
        adaptive?: boolean; // Đèn pha thích ứng
        auto_high_beam?: boolean; // Tự động chuyển đèn pha
        daytime_running?: boolean; // Đèn chạy ban ngày
    };
    taillights?: {
        type?: string; // Loại đèn hậu (led, halogen)
        design?: string; // Thiết kế
    };
    fog_lights?: {
        front?: boolean; // Đèn sương mù phía trước
        rear?: boolean; // Đèn sương mù phía sau
    };
    grille?: {
        type?: string; // Loại lưới tản nhiệt
        material?: string; // Chất liệu
        design?: string; // Thiết kế
    };
    bumpers?: {
        front?: string; // Thiết kế cản trước
        rear?: string; // Thiết kế cản sau
        color?: string; // Màu sắc
    };
    mirrors?: {
        color?: string; // Màu gương
        caps?: string; // Nắp gương
    };
    door_handles?: {
        type?: string; // Loại tay nắm cửa
        color?: string; // Màu sắc
    };
    roof?: {
        type?: string; // Loại mái (solid, panoramic, convertible)
        rails?: boolean; // Thanh gác mái
    };
    exhaust?: {
        tips?: number; // Số ống xả
        design?: string; // Thiết kế
    };
    badges?: {
        chrome?: boolean; // Huy hiệu chrome
        black?: boolean; // Huy hiệu đen
    };
    paint?: {
        type?: string; // Loại sơn (solid, metallic, pearl)
        special_edition?: boolean; // Phiên bản đặc biệt
    };
    other?: string[]; // Các tính năng ngoại thất khác
}


