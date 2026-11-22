// App 1.6.0 copy; browser tool capabilities remain separate.
// Keep browser-only tools distinct from the native App and Safari extension.
export const appLocales = {
  en: {
    name: 'QR Tools: QR Code Reader', subtitle: 'Generator, WiFi & Batch Export',
    description: 'QR Tools 1.6.0 · QR codes in a PDF? Pick the code you need, even when several share a page. For a print run, check the finished label sheet against your CSV before printing.',
    readerPromo: 'Pick a numbered QR code on a PDF page or in a photo and review its destination before opening it.', batchPromo: 'On US Letter Avery 5160 sheets, set the first unused label. Preflight reads each occupied cell in the finished PDF and compares it with its CSV row.',
    download: 'Download on the App Store', learnMore: 'Explore the App', safariTitle: 'Share a Safari page across devices',
    safariSteps: ['Enable QR Tools in Safari extension settings on iPhone, iPad or Mac.', 'Open the extension on the page you want to share. Edit its URL or text, or optionally remove tracking parameters.', 'Scan the QR code with another device to open the same address. Copy the image or save PNG/SVG from the extension.'],
    featuresTitle: 'Read, create and export on your device',
    features: [
      ['PDF, image and camera QR reader', 'Import an image or use an available camera. Review the decoded destination before opening a link; local URL checks do not guarantee website safety. Pick a numbered QR code on a PDF page or in a photo and review its destination before opening it.'],
      ['Wi-Fi, contacts and text', 'Create codes for URLs, text, Wi-Fi, email, SMS and vCard contacts. Customize colors and correction, then copy, share or export PNG/SVG.'],
      ['CSV batch labels', 'Import up to 100 QR labels. Export PNG/SVG ZIP archives or A4/Letter PDF label sheets. Dense codes may need a larger print layout. On US Letter Avery 5160 sheets, set the first unused label. Preflight reads each occupied cell in the finished PDF and compares it with its CSV row.'],
      ['Printable signs', 'Make guest Wi-Fi, event-entry and menu-link signs with a title and caption. Save PNG, show full screen or print a PDF.'],
      ['Calendar events and ICS', 'Create a time-zone-aware Google Calendar template-link QR and a separate ICS file. Opening online calendar links requires internet access.'],
      ['Local processing and history', 'QR generation, image decoding and CSV processing happen on your device. No account is required. Only content you explicitly save enters local App history.']
    ],
    compareTitle: 'Website, App and extensions', compare: 'The website works in this browser without an account or saved history. The native iPhone, iPad and Mac App adds manual local history and system file, photo, print and calendar integration. Its Safari extension reads the current page; the website cannot inspect other tabs. The desktop Chrome extension is a separate installation.',
    imageAlt: 'QR Tools on iPhone showing link creation, a complete QR code and export controls',
    faqHeading: 'App questions',
    questions: [
      ['Can I start at label 29?', 'Yes. With three valid rows, labels 29 and 30 go on the first sheet and label 1 on the next. A mismatch is different from an unreadable code. Use a paper proof to check printer alignment.'],
      ['Why won’t my phone open a localhost link?', 'On your phone, localhost points to the phone itself. In the extension, replace the host with a LAN address your phone can reach. The port and path stay intact; this does not publish your server.'],
      ['Can I send a Safari tab to my phone?', 'Yes. Enable the Safari extension, open QR Tools on the current page and scan the QR with your phone. It shares the page address, not a synced browser session.'],
      ['Is QR content uploaded?', 'QR generation, image reading, CSV processing and local link inspection run on your device. Opening websites or online calendar links uses the destination service.'],
      ['Are codes dynamic or editable after printing?', 'No. These are static QR codes. Regenerate and redistribute a code when its encoded content changes. Anyone with a Wi-Fi or contact QR can read its encoded details.']
    ]
  },
  'zh-Hans': {
    name: 'QR Tools 二维码扫描与生成', subtitle: 'Wi-Fi分享、CSV批量标签打印、名片与日历',
    description: 'QR Tools 1.6.0 · 活动手册里有好几个二维码？直接打开 PDF，翻到那一页，点选要读的码。批量印标签前，还可以逐格核对成品 PDF 和 CSV 里的内容。',
    readerPromo: '翻到 PDF 中的一页，或导入一张图片，按编号选择二维码，查看目标后再决定是否打开。', batchPromo: '使用 US Letter 的 Avery 5160 标签纸时，可从首个空格续排。印前检查逐格读取最终 PDF，并与对应的 CSV 行比较。',
    download: '在 App Store 下载', learnMore: '了解 App', safariTitle: '用二维码跨设备分享 Safari 网页',
    safariSteps: ['在 iPhone、iPad 或 Mac 的 Safari 扩展设置中启用 QR Tools。', '在想分享的网页打开扩展。可先编辑网址或文本，也可选择清理跟踪参数。', '用另一台设备扫码打开相同地址。也可在扩展中复制二维码图片，或保存 PNG/SVG。'],
    featuresTitle: '在设备上读取、生成与导出',
    features: [
      ['PDF、图片与相机识码', '导入图片或使用可用相机识别二维码。打开链接前查看目标地址；本地链接检查不保证网站安全。翻到 PDF 中的一页，或导入一张图片，按编号选择二维码，查看目标后再决定是否打开。'],
      ['Wi-Fi、名片与文本', '为网址、文本、Wi-Fi、邮件、短信和 vCard 联系人生成二维码，调整颜色和纠错级别，复制、分享或导出 PNG/SVG。'],
      ['CSV 批量标签', '导入最多 100 个二维码标签，打包导出 PNG/SVG ZIP，或打印 A4/Letter PDF 标签页。高密度二维码可能需要更大的打印尺寸。使用 US Letter 的 Avery 5160 标签纸时，可从首个空格续排。印前检查逐格读取最终 PDF，并与对应的 CSV 行比较。'],
      ['可打印标牌', '为访客 Wi-Fi、活动入口和菜单链接添加标题与说明，保存 PNG、全屏展示或打印 PDF。'],
      ['日历事件与 ICS', '指定时区，创建 Google 日历模板链接二维码，并单独导出 ICS。打开在线日历链接需要网络。'],
      ['本地处理与手动记录', '二维码生成、图片解码和 CSV 处理都在设备上进行，无需账号。只有主动保存的内容才会进入 App 本地历史。']
    ],
    compareTitle: '网站、App 与扩展的区别', compare: '网站在当前浏览器中使用，无需账号，不保存历史。iPhone、iPad 和 Mac 原生 App 支持手动保存本地记录，并对接系统文件、照片、打印和日历。Safari 扩展读取当前网页；网站不能读取其他标签页。桌面 Chrome 扩展需单独安装。',
    imageAlt: 'iPhone 上的 QR Tools：链接输入、完整二维码和导出按钮', faqHeading: 'App 常见问题',
    questions: [
      ['能从第 29 格开始打印吗？', '可以。三条有效记录会排在第一页的第 29、30 格和第二页的第 1 格。内容不符和无法读取会分别标出；打印机的实际对齐仍需用纸样确认。'],
      ['为什么手机打不开 localhost 链接？', '手机上的 localhost 指向手机本身。在扩展中手动换成手机可访问的局域网主机，端口和路径不变；这不会把本地服务器发布到公网。'],
      ['能把 Safari 当前页发到手机吗？', '可以。启用 Safari 扩展后，在当前页打开 QR Tools，用手机扫码。分享的是网页地址，不是同步浏览器会话。'],
      ['二维码内容会上传吗？', '生成、图片识别、CSV 处理和链接结构检查都在设备上完成。打开网页或在线日历链接时，仍需访问对应服务。'],
      ['打印后可以修改二维码吗？', '不可以，这些是静态二维码。内容改变后需要重新生成和分发。持有 Wi-Fi 或名片二维码的人可以读取其中的信息。']
    ]
  },
  'zh-Hant': {
    name: 'QR Tools: QRCode 掃描器', subtitle: '產生器、Wi-Fi分享、CSV批次列印與日曆事件',
    description: 'QR Tools 1.6.0 · 活動手冊裡有好幾個 QR Code？直接開啟 PDF，翻到該頁就能點選要讀的碼。大量列印標籤前，也能逐格核對輸出的 PDF 與 CSV 內容。',
    readerPromo: '翻到 PDF 的某一頁，或匯入一張圖片，按編號選擇 QR 碼，先檢視目的地再決定是否開啟。', batchPromo: '使用 US Letter 的 Avery 5160 標籤紙時，可從第一個空位接續列印。列印前逐格讀取最終 PDF，並與對應的 CSV 資料列比對。',
    download: '在 App Store 下載', learnMore: '瞭解 App', safariTitle: '透過 QR Code 跨裝置分享 Safari 網頁',
    safariSteps: ['在 iPhone、iPad 或 Mac 的 Safari 擴充功能設定中啟用 QR Tools。', '在想分享的網頁開啟擴充功能。可先編輯網址或文字，並選擇是否移除追蹤參數。', '用另一台裝置掃碼開啟相同網址。亦可複製 QR 圖片或儲存 PNG/SVG。'],
    featuresTitle: '在裝置上讀取、產生與匯出',
    features: [
      ['PDF、圖片與相機讀碼', '匯入圖片或使用可用相機辨識 QR Code。開啟連結前檢查目的地；本機連結檢查不保證網站安全。翻到 PDF 的某一頁，或匯入一張圖片，按編號選擇 QR 碼，先檢視目的地再決定是否開啟。'],
      ['Wi-Fi、名片與文字', '為網址、文字、Wi-Fi、郵件、簡訊和 vCard 聯絡人產生 QR Code，調整顏色與容錯，複製、分享或匯出 PNG/SVG。'],
      ['CSV 批次標籤', '匯入最多 100 個標籤，匯出 PNG/SVG ZIP 或 A4/Letter PDF 標籤頁。高密度 QR Code 可能需要較大的列印尺寸。使用 US Letter 的 Avery 5160 標籤紙時，可從第一個空位接續列印。列印前逐格讀取最終 PDF，並與對應的 CSV 資料列比對。'],
      ['可列印標牌', '為訪客 Wi-Fi、活動入口和選單連結加入標題與說明，儲存 PNG、全螢幕顯示或列印 PDF。'],
      ['日曆事件與 ICS', '指定時區，建立 Google 日曆範本連結 QR Code，並另行匯出 ICS。開啟線上日曆連結需要網路。'],
      ['本機處理與手動記錄', 'QR 產生、圖片解碼與 CSV 處理均在裝置上完成，無需帳號。只有主動儲存的內容才會進入 App 本機歷史。']
    ],
    compareTitle: '網站、App 與擴充功能', compare: '網站在目前瀏覽器運作，無需帳號，不儲存歷史。iPhone、iPad 和 Mac 原生 App 支援手動儲存本機記錄，並整合系統檔案、照片、列印和日曆。Safari 擴充功能讀取目前網頁；網站無法讀取其他分頁。桌面 Chrome 擴充功能需另行安裝。',
    imageAlt: 'iPhone 的 QR Tools：連結輸入、完整 QR Code 與匯出按鈕', faqHeading: 'App 常見問題',
    questions: [
      ['可以從第 29 格開始列印嗎？', '可以。三筆有效資料會排在第一張的第 29、30 格和第二張的第 1 格。內容不符與無法讀取會分別標示；印表機的實際對位仍須以紙樣確認。'],
      ['為什麼手機無法開啟 localhost 連結？', '手機上的 localhost 指向手機本身。在擴充功能裡手動換成手機可連線的區域網路主機，連接埠與路徑不變；這不會將本機伺服器對外公開。'],
      ['可以把 Safari 分頁傳到手機嗎？', '可以。啟用 Safari 擴充功能，在目前分頁開啟 QR Tools，再用手機掃碼。分享的是網址，不是同步瀏覽器工作階段。'],
      ['QR 內容會上傳嗎？', '產生、圖片辨識、CSV 處理與連結結構檢查均在裝置上完成。開啟網頁或線上日曆連結仍需連線至對應服務。'],
      ['列印後能修改 QR Code 嗎？', '不能。這些是靜態 QR Code，內容改變時需重新產生及分發。持有 Wi-Fi 或名片 QR Code 的人可以讀取其中資訊。']
    ]
  },
  ja: {
    name: 'QR Tools QRコードリーダー・作成', subtitle: 'Wi-Fi共有・CSV一括ラベル印刷・カレンダー',
    description: 'QR Tools 1.6.0 · PDFの案内状にQRコードがいくつも並んでいても、スクリーンショットは不要。ページを開いて読みたいコードを選べます。ラベルを印刷する前に、完成したPDFをCSVと照合することもできます。',
    readerPromo: 'PDFのページや写真に複数のQRコードがあるときは、番号を選び、リンク先を確認してから開けます。', batchPromo: 'US LetterのAvery 5160ラベル用紙は、最初の空き位置から再開できます。印刷前に完成したPDFを各位置で読み取り、元のCSV行と照合します。',
    download: 'App Storeでダウンロード', learnMore: 'Appについて', safariTitle: 'Safariのページを別の端末へ',
    safariSteps: ['iPhone、iPad、MacのSafari設定でQR Tools拡張機能を有効にします。', '共有したいページで拡張機能を開きます。URLやテキストを編集し、必要に応じて追跡パラメータを削除できます。', '別の端末でQRを読み取ると同じURLが開きます。拡張機能で画像のコピーやPNG・SVG保存もできます。'],
    featuresTitle: '端末内で読み取り・作成・書き出し',
    features: [
      ['PDF・画像・カメラのQR読み取り', '画像を取り込むか、利用可能なカメラで読み取ります。リンクを開く前に移動先を確認できます。ローカル検査はサイトの安全性を保証しません。PDFのページや写真に複数のQRコードがあるときは、番号を選び、リンク先を確認してから開けます。'],
      ['Wi-Fi・連絡先・テキスト', 'URL、テキスト、Wi-Fi、メール、SMS、vCardをQRに。色や誤り訂正を調整し、コピー・共有・PNG/SVG保存ができます。'],
      ['CSV一括ラベル', '最大100件を取り込み、PNG/SVGのZIPやA4・LetterのPDFラベルに書き出せます。高密度のQRには大きな印刷サイズが必要です。US LetterのAvery 5160ラベル用紙は、最初の空き位置から再開できます。印刷前に完成したPDFを各位置で読み取り、元のCSV行と照合します。'],
      ['印刷用の案内', 'ゲストWi-Fi、イベント入口、メニューリンクにタイトルと説明を添えて、PNG保存・全画面表示・PDF印刷。'],
      ['カレンダーとICS', 'タイムゾーンを指定したGoogleカレンダー入力用リンクのQRと、別のICSファイルを作成。オンラインリンクを開くには通信が必要です。'],
      ['ローカル処理と履歴', '生成・画像解析・CSV処理は端末内で行い、アカウントは不要です。Appの履歴には明示的に保存した内容だけが残ります。']
    ],
    compareTitle: 'Web・App・拡張機能の違い', compare: 'Web版はブラウザ内で動作し、アカウントや履歴保存はありません。iPhone・iPad・MacのAppは手動のローカル履歴とシステムのファイル・写真・印刷・カレンダー連携に対応します。現在のSafariページを取得するのは拡張機能です。Webから他のタブは読めません。デスクトップChrome拡張機能は別途インストールします。',
    imageAlt: 'iPhoneのQR Tools：URL入力、欠けのないQRと書き出しボタン', faqHeading: 'Appのよくある質問',
    questions: [
      ['29枚目の位置から印刷できますか？', 'はい。有効な3行は1ページ目の29、30番と次のページの1番に配置されます。内容の不一致と読み取り不能は別々に表示されます。用紙の位置ずれは試し刷りで確認してください。'],
      ['スマートフォンでlocalhostを開けないのはなぜですか？', 'localhostはスマートフォン自身を指します。拡張機能で、端末から接続できるLAN内のホストに手動で変更してください。ポートとパスは保持されますが、サーバーが外部に公開されるわけではありません。'],
      ['Safariのタブをスマートフォンへ送れますか？', '拡張機能を有効にして現在のページでQR Toolsを開き、スマートフォンでスキャンします。共有するのはURLで、ブラウザのセッションを同期するものではありません。'],
      ['QRの内容はアップロードされますか？', '生成・画像読み取り・CSV処理・リンク構造の確認は端末内で行います。Webサイトやオンラインカレンダーを開く際は各サービスへ接続します。'],
      ['印刷後に内容を変更できますか？', '静的QRなので変更できません。内容を変えたら再生成・再配布してください。Wi-Fiや連絡先QRは、画像を持つ人が内容を読み取れます。']
    ]
  },
  ko: {
    name: 'QR Tools QR코드 스캐너·생성기', subtitle: 'Wi-Fi 공유, CSV 일괄 라벨 인쇄와 일정',
    description: 'QR Tools 1.6.0 · 안내문 PDF에 QR 코드가 여러 개 있어도 화면을 캡처할 필요가 없습니다. 페이지에서 읽을 코드를 고르세요. 라벨을 인쇄하기 전에는 완성된 PDF의 각 코드를 CSV 원본과 대조할 수 있습니다.',
    readerPromo: 'PDF 페이지나 사진에 QR 코드가 여러 개 있으면 번호로 선택한 뒤 목적지를 확인하고 열 수 있습니다.', batchPromo: 'US Letter 규격의 Avery 5160 라벨 용지에서 첫 빈칸을 지정할 수 있습니다. 인쇄 전에 최종 PDF의 각 라벨을 읽어 원래 CSV 행과 비교합니다.',
    download: 'App Store에서 다운로드', learnMore: '앱 알아보기', safariTitle: 'Safari 페이지를 다른 기기로 공유',
    safariSteps: ['iPhone, iPad 또는 Mac의 Safari 확장 설정에서 QR Tools를 켜세요.', '공유할 페이지에서 확장을 여세요. URL이나 텍스트를 편집하고 추적 매개변수 제거 여부를 선택할 수 있습니다.', '다른 기기로 QR을 스캔하면 같은 주소가 열립니다. 확장에서 이미지 복사와 PNG/SVG 저장도 가능합니다.'],
    featuresTitle: '기기에서 읽고 만들고 내보내기',
    features: [
      ['PDF·이미지·카메라 QR 읽기', '이미지를 가져오거나 사용 가능한 카메라로 스캔하세요. 링크를 열기 전에 목적지를 확인할 수 있지만 로컬 검사는 웹사이트 안전을 보장하지 않습니다. PDF 페이지나 사진에 QR 코드가 여러 개 있으면 번호로 선택한 뒤 목적지를 확인하고 열 수 있습니다.'],
      ['Wi-Fi, 연락처와 텍스트', 'URL, 텍스트, Wi-Fi, 이메일, SMS, vCard QR을 만들고 색상과 오류 정정을 조정하세요. 복사, 공유, PNG/SVG 내보내기를 지원합니다.'],
      ['CSV 일괄 라벨', '최대 100개 라벨을 가져와 PNG/SVG ZIP이나 A4/Letter PDF로 내보내세요. 밀도가 높은 QR은 더 큰 인쇄 크기가 필요할 수 있습니다. US Letter 규격의 Avery 5160 라벨 용지에서 첫 빈칸을 지정할 수 있습니다. 인쇄 전에 최종 PDF의 각 라벨을 읽어 원래 CSV 행과 비교합니다.'],
      ['인쇄용 안내판', '게스트 Wi-Fi, 행사 입구, 메뉴 링크에 제목과 설명을 추가하고 PNG 저장, 전체 화면 표시, PDF 인쇄를 사용하세요.'],
      ['캘린더 일정과 ICS', '시간대를 지정해 Google 캘린더 입력 링크 QR과 별도 ICS를 만드세요. 온라인 캘린더 링크를 열 때는 인터넷이 필요합니다.'],
      ['로컬 처리와 기록', 'QR 생성, 이미지 해독, CSV 처리는 기기에서 이루어지며 계정이 필요 없습니다. 직접 저장한 내용만 앱의 로컬 기록에 남습니다.']
    ],
    compareTitle: '웹사이트, 앱과 확장', compare: '웹사이트는 현재 브라우저에서 작동하며 계정이나 저장 기록이 없습니다. iPhone, iPad, Mac 앱은 수동 로컬 기록과 시스템 파일, 사진, 인쇄, 캘린더 연동을 제공합니다. Safari 현재 페이지는 확장에서 읽으며 웹사이트는 다른 탭을 읽을 수 없습니다. 데스크톱 Chrome 확장은 별도 설치입니다.',
    imageAlt: 'iPhone QR Tools의 URL 입력, 전체 QR과 내보내기 버튼', faqHeading: '앱 질문',
    questions: [
      ['29번 칸부터 인쇄할 수 있나요?', '네. 유효한 세 행은 첫 장의 29번과 30번, 다음 장의 1번 칸에 배치됩니다. 내용 불일치와 판독 불가를 구분해 표시합니다. 프린터 정렬은 종이에 시험 인쇄해 확인하세요.'],
      ['휴대전화에서 localhost 링크가 열리지 않는 이유는 무엇인가요?', '휴대전화에서 localhost는 휴대전화 자신을 가리킵니다. 확장 프로그램에서 휴대전화가 접속할 수 있는 LAN 호스트로 직접 바꾸세요. 포트와 경로는 유지되며 서버가 인터넷에 공개되지는 않습니다.'],
      ['Safari 탭을 휴대폰으로 보낼 수 있나요?', 'Safari 확장을 켜고 현재 페이지에서 QR Tools를 연 뒤 휴대폰으로 스캔하세요. 페이지 주소를 공유하며 브라우저 세션을 동기화하지는 않습니다.'],
      ['QR 내용이 업로드되나요?', 'QR 생성, 이미지 읽기, CSV 처리, 링크 구조 검사는 기기에서 실행됩니다. 웹사이트나 온라인 캘린더를 열면 해당 서비스에 접속합니다.'],
      ['인쇄한 QR을 수정할 수 있나요?', '정적 QR이므로 수정할 수 없습니다. 내용이 바뀌면 다시 생성하고 배포하세요. Wi-Fi나 연락처 QR을 가진 사람은 그 정보를 읽을 수 있습니다.']
    ]
  },
  de: {
    name: 'QR Tools: QR Code Scanner', subtitle: 'Generator, WLAN & Etiketten',
    description: 'QR Tools 1.6.0 · Mehrere QR-Codes auf einer PDF-Seite? Wähle den gewünschten Code direkt aus. Gleiche vor dem Etikettendruck die Codes im fertigen PDF mit deiner CSV-Datei ab.',
    readerPromo: 'Auf einer PDF-Seite oder in einem Foto den gewünschten QR-Code anhand seiner Nummer wählen und vor dem Öffnen das Ziel prüfen.', batchPromo: 'Bei Avery 5160 im US-Letter-Format am ersten freien Etikett fortsetzen. Die Druckprüfung liest jede belegte Position im fertigen PDF und vergleicht sie mit der CSV-Zeile.',
    download: 'Im App Store laden', learnMore: 'App kennenlernen', safariTitle: 'Safari-Seiten zwischen Geräten teilen',
    safariSteps: ['QR Tools in den Safari-Erweiterungseinstellungen auf iPhone, iPad oder Mac aktivieren.', 'Die Erweiterung auf der gewünschten Seite öffnen. URL oder Text bearbeiten und Tracking-Parameter bei Bedarf entfernen.', 'Den QR-Code mit einem anderen Gerät scannen, um dieselbe Adresse zu öffnen. Das Bild kopieren oder PNG/SVG in der Erweiterung speichern.'],
    featuresTitle: 'Auf dem Gerät lesen, erstellen und exportieren',
    features: [
      ['QR-Codes aus PDF, Bild und Kamera', 'Bilder importieren oder eine verfügbare Kamera nutzen. Das Ziel vor dem Öffnen prüfen; lokale URL-Prüfungen garantieren keine sichere Website. Auf einer PDF-Seite oder in einem Foto den gewünschten QR-Code anhand seiner Nummer wählen und vor dem Öffnen das Ziel prüfen.'],
      ['WLAN, Kontakte und Text', 'Codes für URL, Text, WLAN, E-Mail, SMS und vCard erstellen. Farben und Fehlerkorrektur anpassen, kopieren, teilen oder PNG/SVG exportieren.'],
      ['CSV-Stapeletiketten', 'Bis zu 100 Etiketten importieren. PNG/SVG als ZIP oder A4-/Letter-PDF drucken. Dichte Codes benötigen gegebenenfalls ein größeres Druckformat. Bei Avery 5160 im US-Letter-Format am ersten freien Etikett fortsetzen. Die Druckprüfung liest jede belegte Position im fertigen PDF und vergleicht sie mit der CSV-Zeile.'],
      ['Druckbare Schilder', 'Gast-WLAN, Veranstaltungszugang und Menülinks mit Titel und Hinweis versehen. PNG speichern, im Vollbild zeigen oder als PDF drucken.'],
      ['Kalendertermine und ICS', 'QR mit einem Google-Kalender-Vorlagenlink und separate ICS mit expliziter Zeitzone erstellen. Online-Kalenderlinks benötigen Internet.'],
      ['Lokale Verarbeitung und Verlauf', 'QR-Erzeugung, Bildlesen und CSV-Verarbeitung erfolgen auf dem Gerät, ohne Konto. Nur ausdrücklich gespeicherte Inhalte landen im lokalen App-Verlauf.']
    ],
    compareTitle: 'Website, App und Erweiterungen', compare: 'Die Website arbeitet im Browser ohne Konto oder gespeicherten Verlauf. Die App für iPhone, iPad und Mac ergänzt manuell gespeicherte Inhalte sowie Systemdateien, Fotos, Druck und Kalender. Den aktuellen Safari-Tab liest die Erweiterung, nicht die Website. Die Desktop-Chrome-Erweiterung wird separat installiert.',
    imageAlt: 'QR Tools auf dem iPhone mit URL-Eingabe, vollständigem QR-Code und Export', faqHeading: 'Fragen zur App',
    questions: [
      ['Kann ich bei Etikett 29 starten?', 'Ja. Drei gültige Zeilen belegen Platz 29 und 30 auf dem ersten Bogen und Platz 1 auf dem nächsten. Abweichende Inhalte und unlesbare Codes werden unterschieden. Die Ausrichtung am Drucker per Probedruck prüfen.'],
      ['Warum öffnet mein Handy den localhost-Link nicht?', 'localhost bezeichnet das Handy selbst. In der Erweiterung den Host von Hand durch eine vom Handy erreichbare LAN-Adresse ersetzen. Port und Pfad bleiben erhalten; der Server wird nicht öffentlich zugänglich.'],
      ['Kann ich einen Safari-Tab ans Handy senden?', 'Ja. Safari-Erweiterung aktivieren, QR Tools auf der aktuellen Seite öffnen und mit dem Handy scannen. Geteilt wird die Adresse, keine synchronisierte Browsersitzung.'],
      ['Werden QR-Inhalte hochgeladen?', 'Erzeugung, Bildlesen, CSV-Verarbeitung und URL-Strukturprüfung laufen lokal. Beim Öffnen von Websites oder Online-Kalenderlinks wird der jeweilige Dienst kontaktiert.'],
      ['Sind gedruckte Codes später änderbar?', 'Nein, die Codes sind statisch. Nach Änderungen neu erzeugen und verteilen. Wer einen WLAN- oder Kontakt-QR besitzt, kann dessen Daten lesen.']
    ]
  },
  fr: {
    name: 'QR Tools: Lecteur de QR Code', subtitle: 'Générateur, Wi-Fi et lots CSV',
    description: 'QR Tools 1.6.0 · Plusieurs QR codes sur une page PDF ? Choisissez celui à lire. Avant d’imprimer vos étiquettes, comparez les codes du PDF final au contenu de votre CSV.',
    readerPromo: 'Sur une page de PDF ou une photo, choisissez un code QR par son numéro et vérifiez sa destination avant de l’ouvrir.', batchPromo: 'Sur une feuille Avery 5160 au format US Letter, indiquez la première case libre. Avant impression, l’app relit chaque case occupée du PDF final et la compare à la ligne du CSV.',
    download: 'Télécharger sur l’App Store', learnMore: 'Découvrir l’app', safariTitle: 'Partager une page Safari entre appareils',
    safariSteps: ['Activez QR Tools dans les réglages des extensions Safari sur iPhone, iPad ou Mac.', 'Ouvrez l’extension sur la page à partager. Modifiez l’URL ou le texte et supprimez les paramètres de suivi si vous le souhaitez.', 'Scannez le QR avec un autre appareil pour ouvrir la même adresse. Copiez l’image ou enregistrez un PNG/SVG depuis l’extension.'],
    featuresTitle: 'Lire, créer et exporter sur l’appareil',
    features: [
      ['Lecture QR : PDF, images et caméra', 'Importez une image ou utilisez une caméra disponible. Vérifiez la destination avant d’ouvrir un lien ; les contrôles locaux ne garantissent pas la sécurité d’un site. Sur une page de PDF ou une photo, choisissez un code QR par son numéro et vérifiez sa destination avant de l’ouvrir.'],
      ['Wi-Fi, contacts et texte', 'Créez des QR pour URL, texte, Wi-Fi, e-mail, SMS et vCard. Réglez couleurs et correction, puis copiez, partagez ou exportez PNG/SVG.'],
      ['Étiquettes CSV par lots', 'Importez jusqu’à 100 étiquettes. Exportez PNG/SVG en ZIP ou imprimez un PDF A4/Letter. Les codes denses peuvent nécessiter un format plus grand. Sur une feuille Avery 5160 au format US Letter, indiquez la première case libre. Avant impression, l’app relit chaque case occupée du PDF final et la compare à la ligne du CSV.'],
      ['Affiches à imprimer', 'Ajoutez titre et légende aux QR de Wi-Fi invité, d’entrée d’événement ou de menu. Enregistrez un PNG, affichez en plein écran ou imprimez un PDF.'],
      ['Événements et ICS', 'Créez un QR vers un modèle Google Agenda et un fichier ICS distinct avec fuseau explicite. Les liens d’agenda en ligne nécessitent Internet.'],
      ['Traitement et historique locaux', 'Génération, décodage d’images et traitement CSV restent sur l’appareil, sans compte. Seuls les contenus enregistrés volontairement restent dans l’historique local de l’app.']
    ],
    compareTitle: 'Site, app et extensions', compare: 'Le site fonctionne dans le navigateur sans compte ni historique enregistré. L’app iPhone, iPad et Mac ajoute l’historique manuel et les fonctions système de fichiers, photos, impression et calendrier. L’extension Safari lit la page actuelle ; le site ne lit pas les autres onglets. L’extension Chrome de bureau s’installe séparément.',
    imageAlt: 'QR Tools sur iPhone avec URL, code QR complet et commandes d’export', faqHeading: 'Questions sur l’app',
    questions: [
      ['Puis-je commencer à la case 29 ?', 'Oui. Trois lignes valides occupent les cases 29 et 30 de la première feuille, puis la case 1 de la suivante. Un contenu différent est distingué d’un code illisible. Vérifiez l’alignement de l’imprimante sur papier.'],
      ['Pourquoi mon téléphone ne peut-il pas ouvrir localhost ?', 'Sur le téléphone, localhost désigne le téléphone lui-même. Dans l’extension, remplacez l’hôte par une adresse du réseau local accessible depuis le téléphone. Le port et le chemin sont conservés ; le serveur n’est pas rendu public.'],
      ['Puis-je envoyer un onglet Safari vers mon téléphone ?', 'Oui. Activez l’extension, ouvrez QR Tools sur la page et scannez avec le téléphone. Seule l’adresse est partagée, pas la session du navigateur.'],
      ['Le contenu QR est-il envoyé à un serveur ?', 'Génération, lecture d’images, traitement CSV et inspection de structure sont locaux. Ouvrir un site ou un agenda en ligne contacte le service concerné.'],
      ['Peut-on modifier un QR après impression ?', 'Non, les QR sont statiques. Générez et distribuez un nouveau code si le contenu change. Toute personne possédant un QR Wi-Fi ou de contact peut lire les informations encodées.']
    ]
  },
  es: {
    name: 'QR Tools: Lector y Generador', subtitle: 'Escáner QR, WiFi y etiquetas',
    description: 'QR Tools 1.6.0 · ¿Hay varios códigos QR en una página de un PDF? Elige el que quieres leer. Antes de imprimir etiquetas, compara los códigos del PDF final con los datos de tu CSV.',
    readerPromo: 'En una página de un PDF o en una foto, elige el código QR por su número y revisa el destino antes de abrirlo.', batchPromo: 'En hojas Avery 5160 de tamaño carta (US Letter), indica la primera casilla libre. Antes de imprimir, la app lee cada casilla ocupada del PDF final y la compara con su fila del CSV.',
    download: 'Descargar en el App Store', learnMore: 'Conoce la app', safariTitle: 'Comparte páginas de Safari entre dispositivos',
    safariSteps: ['Activa QR Tools en los ajustes de extensiones de Safari de iPhone, iPad o Mac.', 'Abre la extensión en la página que quieras compartir. Edita la URL o el texto y elimina parámetros de seguimiento si lo deseas.', 'Escanea el QR con otro dispositivo para abrir la misma dirección. Copia la imagen o guarda PNG/SVG desde la extensión.'],
    featuresTitle: 'Lee, crea y exporta en tu dispositivo',
    features: [
      ['Lectura de QR en PDF, imágenes y cámara', 'Importa una imagen o usa una cámara disponible. Revisa el destino antes de abrir un enlace; la inspección local no garantiza la seguridad del sitio. En una página de un PDF o en una foto, elige el código QR por su número y revisa el destino antes de abrirlo.'],
      ['Wi-Fi, contactos y texto', 'Crea QR de URL, texto, Wi-Fi, correo, SMS y vCard. Ajusta colores y corrección, copia, comparte o exporta PNG/SVG.'],
      ['Etiquetas CSV por lotes', 'Importa hasta 100 etiquetas. Exporta PNG/SVG en ZIP o imprime PDF A4/Letter. Los códigos densos pueden necesitar una impresión mayor. En hojas Avery 5160 de tamaño carta (US Letter), indica la primera casilla libre. Antes de imprimir, la app lee cada casilla ocupada del PDF final y la compara con su fila del CSV.'],
      ['Carteles imprimibles', 'Añade título y descripción al Wi-Fi de invitados, accesos a eventos o enlaces de menú. Guarda PNG, muestra a pantalla completa o imprime PDF.'],
      ['Calendario e ICS', 'Crea un QR de enlace de plantilla de Google Calendar y un ICS separado con zona horaria explícita. Los enlaces en línea requieren Internet.'],
      ['Procesamiento e historial locales', 'La generación, lectura de imágenes y procesamiento CSV ocurren en el dispositivo, sin cuenta. Solo el contenido que guardas expresamente entra en el historial local de la app.']
    ],
    compareTitle: 'Web, app y extensiones', compare: 'La web funciona en el navegador sin cuenta ni historial guardado. La app de iPhone, iPad y Mac añade historial manual e integración con archivos, fotos, impresión y calendario del sistema. La extensión Safari lee la página actual; la web no lee otras pestañas. La extensión de escritorio Chrome se instala por separado.',
    imageAlt: 'QR Tools en iPhone con URL, QR completo y controles de exportación', faqHeading: 'Preguntas sobre la app',
    questions: [
      ['¿Puedo empezar en la casilla 29?', 'Sí. Tres filas válidas ocupan las casillas 29 y 30 de la primera hoja y la casilla 1 de la siguiente. Se distingue entre un contenido incorrecto y un código ilegible. Comprueba la alineación de la impresora con una prueba en papel.'],
      ['¿Por qué no se abre localhost en el móvil?', 'En el móvil, localhost apunta al propio teléfono. En la extensión, sustituye el host por una dirección de la red local accesible desde el móvil. Se conservan el puerto y la ruta; el servidor no se hace público.'],
      ['¿Puedo enviar una pestaña de Safari al móvil?', 'Sí. Activa la extensión, abre QR Tools en la página actual y escanea con el móvil. Comparte la dirección, no una sesión sincronizada del navegador.'],
      ['¿Se sube el contenido QR?', 'La generación, lectura de imágenes, procesamiento CSV e inspección de estructura son locales. Abrir sitios o calendarios en línea contacta con el servicio correspondiente.'],
      ['¿Puedo editar un QR ya impreso?', 'No, los QR son estáticos. Genera y distribuye otro si cambia el contenido. Quien tenga un QR de Wi-Fi o contacto podrá leer sus datos.']
    ]
  }
};
