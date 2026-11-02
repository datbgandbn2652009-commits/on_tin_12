window.TF_DATA = [
  {
    q: "Hub và switch là thiết bị dùng để kết nối các máy tính trong cùng một mạng LAN qua cáp mạng. Hub phát tín hiệu đến tất cả các cổng, còn switch thiết lập một kênh truyền riêng giữa hai thiết bị gửi và nhận để truyền dữ liệu và giải phóng kênh sau khi truyền xong. Hãy xác định tính đúng hay sai cho các nhận định sau:",
    items: [
      { text: "Hub và switch đều là thiết bị kết nối trong mạng LAN", a: 0 },
      {
        text: "Switch có khả năng thiết lập kênh truyền riêng giữa hai thiết bị để truyền dữ liệu",
        a: 0,
      },
      {
        text: "Hub có thể gây ra xung đột tín hiệu khi kết nối nhiều thiết bị",
        a: 0,
      },
      {
        text: "Switch phù hợp với mạng LAN lớn vì giảm thiểu xung đột tín hiệu tốt hơn hub",
        a: 0,
      },
    ],
    t: "Mạng máy tính",
    answers: [0, 0, 0, 0],
  },
  {
    q: "Router có nhiệm vụ định tuyến dữ liệu giữa các mạng khác nhau. Trong mạng gia đình, router kết nối mạng nội bộ với Internet thông qua cổng WAN. Dữ liệu sẽ được chuyển từ mạng LAN nội bộ ra ngoài Internet thông qua router. Hãy xác định tính đúng hay sai cho các nhận định sau:",
    items: [
      {
        text: "Router trong mạng gia đình kết nối mạng LAN nội bộ với Internet thông qua nhà cung cấp dịch vụ",
        a: 0,
      },
      {
        text: "Router có nhiệm vụ định tuyến dữ liệu giữa các mạng khác nhau",
        a: 0,
      },
      { text: "Router gia đình thường có cổng WAN để kết nối Internet", a: 0 },
      {
        text: "Router có thể chuyển dữ liệu từ mạng LAN này đến mạng LAN khác qua cổng WAN",
        a: 0,
      },
    ],
    t: "Mạng máy tính",
    answers: [0, 0, 0, 0],
  },
  {
    q: "Máy tính (kể cả các thiết bị di động) có thể kết nối vào mạng bằng cáp tín hiệu hoặc qua sóng Wi-Fi.",
    items: [
      {
        text: "Để máy tính trong LAN có thể giao tiếp với Internet thì chỉ cần cắm cáp mạng UTP vào cổng RJ45 của máy tính",
        a: 1,
      },
      {
        text: "Muốn kết nối thiết bị di động vào LAN bằng một trạm thu phát Wi-Fi được bảo mật, ta cần gõ đúng mật khẩu của trạm thu phát Wi-Fi đó",
        a: 0,
      },
      { text: "Wi-Fi là chữ viết tắt của cụm từ Wireless Fidelity", a: 0 },
      {
        text: "Hầu hết các máy tính để bàn đều có sẵn khả năng kết nối Wi-Fi như máy tính xách tay hay điện thoại thông minh",
        a: 1,
      },
    ],
    t: "Mạng máy tính",
    answers: [1, 0, 0, 1],
  },
  {
    q: "Địa chỉ IP là một địa chỉ số được gán cho thiết bị khi kết nối vào Internet. Hiện nay có hai loại địa chỉ IP là IPv4 và IPv6, trong đó IPv4 sử dụng 4 byte, mỗi byte phân cách bởi dấu chấm. Hãy xác định tính đúng hay sai cho các nhận định sau:",
    items: [
      {
        text: "Địa chỉ IP giúp định danh và kết nối các thiết bị với nhau trên mạng Internet",
        a: 0,
      },
      { text: "Địa chỉ IP là địa chỉ số cho mỗi thiết bị trên Internet", a: 0 },
      { text: "IPv4 là địa chỉ IP có độ dài 4 byte", a: 0 },
      { text: "IPv6 có độ dài ngắn hơn so với IPv4", a: 1 },
    ],
    t: "Địa chỉ & giao thức",
    answers: [0, 0, 0, 1],
  },
  {
    q: "Việc định tuyến dữ liệu trong Internet được thực hiện thông qua router. Router sử dụng bảng định tuyến để chọn đường đi tối ưu cho các gói dữ liệu. Gói dữ liệu sẽ được chuyển đến đích qua các cổng mạng khác nhau tùy thuộc vào cấu hình của bảng định tuyến. Hãy xác định tính đúng hay sai cho các nhận định sau:",
    items: [
      { text: "Router thực hiện việc định tuyến dữ liệu trên Internet", a: 0 },
      {
        text: "Router giúp tối ưu đường đi của dữ liệu qua các cổng mạng khác nhau",
        a: 0,
      },
      { text: "Mỗi router chỉ có một cổng để gửi dữ liệu ra ngoài", a: 1 },
      {
        text: "Router sử dụng bảng định tuyến để xác định cổng gửi dữ liệu",
        a: 0,
      },
    ],
    t: "Mạng máy tính",
    answers: [0, 0, 1, 0],
  },
  {
    q: "Giao thức IP và TCP là hai giao thức cốt lõi của Internet, thường được gọi chung là TCP/IP. TCP/IP cho phép kết nối và trao đổi dữ liệu trên Internet. Hãy xác định tính đúng hay sai cho các nhận định sau:",
    items: [
      {
        text: "TCP/IP là bộ giao thức cơ bản cho Internet, cho phép kết nối và trao đổi dữ liệu",
        a: 0,
      },
      { text: "TCP/IP là tên gọi chung của hai giao thức TCP và IP", a: 0 },
      {
        text: "IP thực hiện việc kiểm tra và khôi phục dữ liệu trong mạng Internet",
        a: 1,
      },
      {
        text: "TCP đảm bảo dữ liệu được truyền đi đúng thứ tự và không mất mát",
        a: 0,
      },
    ],
    t: "Địa chỉ & giao thức",
    answers: [0, 0, 1, 0],
  },
  {
    q: "Để thiết lập môi trường chia sẻ tệp và máy in, cần thực hiện một số cài đặt trên máy tính trong mạng. Môi trường thuận lợi để chia sẻ tệp và máy in yêu cầu thiết lập chế độ mạng riêng và cho phép các máy khác nhìn thấy và chia sẻ tài nguyên. Hãy xác định tính đúng hay sai cho các nhận định sau:",
    items: [
      {
        text: 'Chế độ "discoverable" giúp các máy tính nhìn thấy nhau trong mạng',
        a: 0,
      },
      { text: "Tường lửa phải được bật khi chia sẻ tệp và máy in", a: 1 },
      {
        text: "Để chia sẻ tài nguyên, cần cho phép chế độ chia sẻ tệp và máy in trên mạng riêng",
        a: 0,
      },
      {
        text: "Thiết lập mạng riêng là yêu cầu cần thiết để chia sẻ tệp và máy in",
        a: 0,
      },
    ],
    t: "Chia sẻ & an toàn số",
    answers: [0, 1, 0, 0],
  },
  {
    q: "Việc thiết lập quyền truy cập cho các thư mục chia sẻ giúp người dùng kiểm soát ai có quyền xem và chỉnh sửa tài liệu. Người dùng có thể chọn quyền truy cập khác nhau cho từng người dùng trong mạng. Hãy xác định tính đúng hay sai cho các nhận định sau:",
    items: [
      {
        text: "Tất cả người dùng trong mạng đều có quyền truy cập đầy đủ vào thư mục chia sẻ",
        a: 1,
      },
      {
        text: "Việc thiết lập quyền truy cập giúp bảo vệ tài liệu khỏi các truy cập trái phép",
        a: 0,
      },
      {
        text: "Người dùng có thể giới hạn quyền truy cập cho từng người trong mạng",
        a: 0,
      },
      {
        text: "Thiết lập quyền truy cập giúp kiểm soát quyền truy cập tài liệu",
        a: 0,
      },
    ],
    t: "Chia sẻ & an toàn số",
    answers: [1, 0, 0, 0],
  },
];
