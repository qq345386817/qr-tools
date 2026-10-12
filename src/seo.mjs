import { workflowSeo } from './workflow-locales.mjs';

export const notFound = {
  en: ['Page not found', 'This page is not available. Continue with a QR tool below.'],
  'zh-Hans': ['页面不存在', '该页面不可用。请继续使用下方的二维码工具。'],
  'zh-Hant': ['找不到頁面', '此頁面無法使用。請繼續使用下方的 QR Code 工具。'],
  ja: ['ページが見つかりません', 'このページは利用できません。下のQRツールをご利用ください。'],
  ko: ['페이지를 찾을 수 없습니다', '이 페이지를 사용할 수 없습니다. 아래 QR 도구를 이용하세요.'],
  de: ['Seite nicht gefunden', 'Diese Seite ist nicht verfügbar. Nutze eines der QR-Tools unten.'],
  fr: ['Page introuvable', 'Cette page est indisponible. Utilisez un outil QR ci-dessous.'],
  es: ['Página no encontrada', 'Esta página no está disponible. Usa una herramienta QR de abajo.'],
};

export const seo = {
  en: {
    faqHeading: 'QR code questions',
    home: {
      title: 'Free Online QR Code Generator & Reader',
      description: 'Make free static QR codes for URLs, text, Wi-Fi, email, SMS and vCard contacts. Customize colors, export PNG or SVG, and scan QR images without uploading them.',
      summary: 'Create a free QR code for a link, text, Wi-Fi network, email, SMS or contact card. Download PNG or SVG, or read a QR code from an image.',
      questions: [
        ['Are these QR codes free and static?', 'The website generates free static QR codes without an account. The content is stored in the QR image itself, not behind a QR Tools redirect. Changing the content requires generating and sharing a new image.'],
        ['Does QR Tools upload or save my data?', 'QR content, Wi-Fi passwords and selected images are processed in your browser. The website does not upload them or save a history. Downloaded or shared QR images contain the information you entered.'],
        ['Should I download a PNG or SVG QR code?', 'PNG is useful for image sharing and documents. SVG stays sharp when resized for printing. Both encode the same content; keep the light margin around the code and use a dark code on a light background.'],
        ['Can the website capture another browser tab?', 'Paste the page URL into the website to create its QR code. The Safari and Chrome extensions can obtain the current tab URL directly; the website cannot read your other tabs.'],
      ],
    },
    wifi: {
      title: 'Free Wi-Fi QR Code Generator for Guests',
      description: 'Create a Wi-Fi QR code for guests: network name, password, WPA/WPA2/WPA3 or WEP, open and hidden networks. Download PNG or SVG with no password upload.',
      questions: [
        ['How does a Wi-Fi QR code connect a guest?', 'The code contains the network name, security type and password, plus a hidden-network flag if selected. Scan it with a compatible phone camera and confirm the connection. Device support varies; this tool does not configure the router.'],
        ['Is the Wi-Fi password encrypted in the QR code?', 'No. Anyone with the QR image can read its encoded password. Share a guest-network QR code only with people who should have access. The generator supports password-based WPA, WEP and open networks, not enterprise login or certificate profiles.'],
        ['What if I change my network password?', 'Generate a new Wi-Fi QR code using the new details. The old image does not update automatically and will still contain the old password.'],
      ],
    },
    contact: {
      title: 'Free vCard QR Code Generator for Contact Cards',
      description: 'Make a static vCard 3.0 contact QR code with name, phone, email, company and website. Export your contact card as PNG or SVG without an account.',
      questions: [
        ['What is included in a contact QR code?', 'A contact QR code encodes a vCard 3.0 record with the name and optional phone number, email, organization and website you enter. A compatible scanner can offer to add those details to contacts.'],
        ['Can I update a contact card after distributing it?', 'This is a static vCard QR code, not a hosted digital profile. To change a phone number or other details, generate a new image and replace the previously distributed code.'],
        ['Which contact details should I share?', 'Include only the information you intend recipients to receive. QR images can be copied and decoded by anyone who has them. No account is required, and the website does not save your contact card.'],
      ],
    },
    reader: {
      title: 'Free Online QR Code Reader for Images & Camera',
      description: 'Read QR codes from PNG, JPEG, GIF, WebP or BMP images, or use your camera. Decode locally, review the text and open links yourself. No image upload.',
      questions: [
        ['Which QR images can I read?', 'Choose a PNG, JPEG, GIF, WebP or BMP image below 20 MB and 40 megapixels. Use a clear image with the entire code and its light margin visible. The reader finds one QR code at a time; animated images are read as a still frame.'],
        ['Will scanning automatically open a link?', 'No. The decoded content is shown as text first. Only HTTP and HTTPS addresses receive an optional Open link button. Other content is not executed, and scanning does not sign you in or join a Wi-Fi network.'],
        ['Does camera scanning need permission?', 'Camera scanning is optional and requires browser permission on HTTPS. Audio is not requested. Camera tracks stop when a code is found, the tab is hidden, you leave the page or switch back to Create.'],
      ],
    },
  },
  'zh-Hans': {
    faqHeading: '常见问题',
    home: {
      title: '免费在线二维码生成器与识别工具',
      description: '免费生成网址、文本、Wi-Fi、邮件、短信和 vCard 联系人静态二维码。自定义颜色，导出 PNG 或 SVG，本地识别图片二维码，无需上传。',
      summary: '免费生成链接、文本、Wi-Fi 网络、邮件、短信或联系人名片二维码。下载 PNG、SVG，或从图片中识别二维码。',
      questions: [
        ['生成的二维码免费吗？是静态二维码吗？', '网站无需账号即可免费生成静态二维码，内容直接编码在图片中，不经过 QR Tools 的跳转服务。修改内容后需要重新生成并分享新图片。'],
        ['网站会上传或保存我的数据吗？', '二维码内容、Wi-Fi 密码和选择的图片都在浏览器本地处理，网站不会上传它们或保存历史。下载或分享的二维码图片包含你输入的信息。'],
        ['应该下载 PNG 还是 SVG？', 'PNG 适合图片分享和文档；SVG 放大后仍清晰，适合打印。两种格式编码内容相同。请保留二维码周围的浅色留白，使用深色二维码和浅色背景。'],
        ['网站可以读取其他浏览器标签页吗？', '在网站中粘贴网页地址即可生成二维码。Safari 和 Chrome 扩展可以直接获取当前标签页地址，网站本身无法读取你的其他标签页。'],
      ],
    },
    wifi: {
      title: '免费 Wi-Fi 二维码生成器：访客网络与隐藏网络',
      description: '为访客生成 Wi-Fi 二维码，支持网络名称、密码、WPA/WPA2/WPA3、WEP、无密码和隐藏网络。下载 PNG 或 SVG，密码无需上传。',
      questions: [
        ['访客如何通过 Wi-Fi 二维码连接网络？', '二维码包含网络名称、安全类型和密码，也可包含隐藏网络标记。使用支持该格式的手机相机扫描并确认连接即可。支持情况取决于设备，本工具不会配置路由器。'],
        ['二维码中的 Wi-Fi 密码经过加密吗？', '没有。拿到二维码图片的人都可以读出密码。建议使用访客网络，并只分享给应当获得访问权限的人。生成器支持基于密码的 WPA、WEP 和无密码网络，不支持企业账号登录或证书配置。'],
        ['更改网络密码后，二维码会自动更新吗？', '不会。请用新的网络信息重新生成 Wi-Fi 二维码。旧图片仍然包含旧密码，不会自动更新。'],
      ],
    },
    contact: {
      title: '免费 vCard 联系人二维码生成器：电子名片',
      description: '将姓名、电话、邮箱、公司和网站生成 vCard 3.0 静态联系人二维码。电子名片可导出 PNG 或 SVG，无需账号。',
      questions: [
        ['联系人二维码包含哪些信息？', '二维码将你填写的姓名，以及可选的电话、邮箱、组织和网站编码为 vCard 3.0 联系人记录。支持该格式的扫码工具可以提示将信息添加到通讯录。'],
        ['名片发出去后还能修改内容吗？', '这是静态 vCard 二维码，不是托管的在线个人主页。如果电话或其他信息发生变化，需要生成新图片并替换之前分享的二维码。'],
        ['应该在二维码名片里填写哪些联系方式？', '只填写准备提供给接收者的信息。二维码图片可以被复制，任何拿到图片的人都能读取内容。网站无需账号，也不保存你的名片。'],
      ],
    },
    reader: {
      title: '免费在线二维码识别器：图片与相机扫描',
      description: '从 PNG、JPEG、GIF、WebP 或 BMP 图片中识别二维码，也可使用相机扫描。浏览器本地解码，先查看内容再打开链接，图片无需上传。',
      questions: [
        ['支持识别哪些二维码图片？', '支持小于 20 MB、4000 万像素的 PNG、JPEG、GIF、WebP 和 BMP 图片。请使用完整、清晰且保留周围留白的二维码图片。一次识别一个二维码，动画图片按静止帧处理。'],
        ['识别二维码会自动打开链接吗？', '不会。网站先以文本显示内容，仅为 HTTP 或 HTTPS 地址提供可选的打开链接按钮。其他内容不会被执行，识别也不会替你登录账号或连接 Wi-Fi。'],
        ['相机扫描需要授权吗？', '相机扫描是可选功能，需要在 HTTPS 网站上授予浏览器相机权限，不请求麦克风权限。识别成功、隐藏标签页、离开页面或切回生成功能时，相机会停止。'],
      ],
    },
  },
  'zh-Hant': {
    faqHeading: '常見問題',
    home: {
      title: '免費線上 QR Code 產生器與辨識工具',
      description: '免費產生網址、文字、Wi-Fi、Email、簡訊及 vCard 聯絡人靜態 QR Code。自訂顏色、匯出 PNG 或 SVG，在本機辨識圖片，無須上傳。',
      summary: '免費產生連結、文字、Wi-Fi 網路、Email、簡訊或聯絡人名片 QR Code。下載 PNG、SVG，或從圖片辨識 QR Code。',
      questions: [
        ['QR Code 免費嗎？是靜態的嗎？', '網站無須帳號即可免費產生靜態 QR Code。內容直接編碼在圖片中，不透過 QR Tools 轉址。修改內容時須重新產生並分享新圖片。'],
        ['網站會上傳或儲存我的資料嗎？', 'QR 內容、Wi-Fi 密碼和選取的圖片都在瀏覽器本機處理，網站不會上傳或儲存歷史。下載或分享的 QR Code 圖片包含你輸入的資訊。'],
        ['應該下載 PNG 還是 SVG？', 'PNG 適合圖片分享和文件；SVG 放大後依然清晰，適合列印。兩種格式的內容相同。請保留 QR Code 周圍的淺色留白，使用深色碼與淺色背景。'],
        ['網站能讀取其他瀏覽器分頁嗎？', '在網站貼上網址即可產生 QR Code。Safari 與 Chrome 擴充功能可直接取得目前分頁網址，網站本身無法讀取其他分頁。'],
      ],
    },
    wifi: {
      title: '免費 Wi-Fi QR Code 產生器：訪客與隱藏網路',
      description: '為訪客產生 Wi-Fi QR Code，支援網路名稱、密碼、WPA/WPA2/WPA3、WEP、無密碼與隱藏網路。下載 PNG 或 SVG，密碼無須上傳。',
      questions: [
        ['訪客如何透過 Wi-Fi QR Code 連線？', 'QR Code 包含網路名稱、安全類型和密碼，也可包含隱藏網路標記。以相容的手機相機掃描並確認連線。支援情況取決於裝置，本工具不會設定路由器。'],
        ['QR Code 內的 Wi-Fi 密碼有加密嗎？', '沒有。任何取得 QR 圖片的人都能讀出密碼。建議分享訪客網路，並只提供給應有存取權限的人。產生器支援密碼式 WPA、WEP 與無密碼網路，不支援企業帳號或憑證設定。'],
        ['變更網路密碼後會自動更新嗎？', '不會。請使用新網路資訊重新產生 Wi-Fi QR Code。舊圖片仍然包含舊密碼。'],
      ],
    },
    contact: {
      title: '免費 vCard 聯絡人 QR Code 產生器：電子名片',
      description: '將姓名、電話、Email、公司和網站產生為 vCard 3.0 靜態聯絡人 QR Code。電子名片可匯出 PNG 或 SVG，無須帳號。',
      questions: [
        ['聯絡人 QR Code 包含哪些資訊？', 'QR Code 將姓名和選填的電話、Email、組織及網站編碼為 vCard 3.0 記錄。相容的掃描工具可提示將資訊加入聯絡人。'],
        ['分享名片後還能修改內容嗎？', '這是靜態 vCard QR Code，不是託管的線上個人頁面。電話或其他資訊變更時，須產生新圖片並替換之前分享的 QR Code。'],
        ['名片應該填寫哪些聯絡方式？', '只填寫準備提供給接收者的資訊。QR 圖片可以被複製，任何取得圖片的人都能讀取內容。網站無須帳號，也不儲存你的名片。'],
      ],
    },
    reader: {
      title: '免費線上 QR Code 辨識器：圖片與相機掃描',
      description: '辨識 PNG、JPEG、GIF、WebP 或 BMP 圖片中的 QR Code，也可使用相機。在瀏覽器本機解碼，先查看內容再開啟連結，無須上傳圖片。',
      questions: [
        ['支援哪些 QR Code 圖片？', '支援小於 20 MB、4000 萬像素的 PNG、JPEG、GIF、WebP 與 BMP 圖片。請保留完整清晰的碼與周圍留白。一次辨識一個碼，動畫圖片按靜止影格處理。'],
        ['辨識後會自動開啟連結嗎？', '不會。網站先以文字顯示內容，僅為 HTTP 或 HTTPS 網址提供可選的開啟連結按鈕。其他內容不會執行，也不會替你登入或連接 Wi-Fi。'],
        ['相機掃描需要授權嗎？', '這是選用功能，須在 HTTPS 網站授予瀏覽器相機權限，不請求麥克風。辨識成功、隱藏分頁、離開頁面或切回產生模式時，相機會停止。'],
      ],
    },
  },
  ja: {
    faqHeading: 'QRコードの質問',
    home: {
      title: '無料オンラインQRコード作成・読み取り',
      description: 'URL、テキスト、Wi-Fi、メール、SMS、vCard連絡先の静的QRコードを無料作成。色変更、PNG・SVG保存、画像読み取りをアップロードなしで行えます。',
      summary: 'リンク、テキスト、Wi-Fi、メール、SMS、連絡先のQRコードを無料で作成。PNG・SVGの保存や画像からの読み取りができます。',
      questions: [
        ['無料ですか？静的QRコードですか？', 'アカウントなしで無料の静的QRコードを作成します。内容は画像自体に保存され、QR Toolsの転送サービスを経由しません。内容変更には新しい画像の作成と共有が必要です。'],
        ['入力や画像はアップロード・保存されますか？', 'QRの内容、Wi-Fiパスワード、選択した画像はブラウザ内で処理されます。ウェブサイトはアップロードや履歴保存を行いません。保存・共有するQR画像には入力した情報が含まれます。'],
        ['PNGとSVGはどう選べばよいですか？', 'PNGは画像共有や文書に、拡大しても鮮明なSVGは印刷に適しています。内容は同じです。周囲の明るい余白を残し、濃いコードと明るい背景を使ってください。'],
        ['別のブラウザタブを取得できますか？', 'サイトにURLを貼り付けて作成します。Safari・Chrome拡張機能は現在のタブのURLを直接取得できますが、ウェブサイトは他のタブを読めません。'],
      ],
    },
    wifi: {
      title: '無料Wi-Fi QRコード作成｜ゲスト・非表示ネットワーク',
      description: '名前、パスワード、WPA/WPA2/WPA3、WEP、暗号化なし・非表示ネットワークのWi-Fi QRを作成。パスワードを送信せずPNG・SVGで保存。',
      questions: [
        ['ゲストはWi-Fi QRでどう接続しますか？', 'コードにはネットワーク名、セキュリティ、パスワードと任意の非表示フラグが含まれます。対応するスマートフォンで読み取り、接続を確認します。対応状況は端末によって異なり、ルーターの設定は行いません。'],
        ['QR内のWi-Fiパスワードは暗号化されますか？', 'いいえ。画像を持つ人はパスワードを読み取れます。ゲスト用ネットワークを使い、アクセスを許可する人だけに共有してください。パスワード式WPA、WEP、暗号化なしに対応し、企業のアカウントや証明書には対応しません。'],
        ['パスワード変更でコードも更新されますか？', '自動更新はされません。新しい情報で作り直してください。以前の画像には古いパスワードが残ります。'],
      ],
    },
    contact: {
      title: '無料vCard QRコード作成｜連絡先・名刺',
      description: '氏名、電話、メール、会社、ウェブサイトをvCard 3.0の静的連絡先QRに。アカウントなしで名刺をPNG・SVGに書き出せます。',
      questions: [
        ['連絡先QRには何が入りますか？', '氏名と任意の電話、メール、組織、ウェブサイトをvCard 3.0形式で保存します。対応する読み取りアプリは連絡先への追加を提案できます。'],
        ['配布した名刺の内容を変更できますか？', 'これは静的vCard QRで、オンラインプロフィールではありません。電話などを変更した場合は、新しい画像を作り、配布済みのコードを置き換えてください。'],
        ['どの連絡先情報を載せるべきですか？', '相手に渡したい情報だけを入力してください。QR画像はコピーでき、画像を持つ人なら内容を読めます。アカウントは不要で、サイトは名刺を保存しません。'],
      ],
    },
    reader: {
      title: '無料オンラインQR読み取り｜画像・カメラ',
      description: 'PNG、JPEG、GIF、WebP、BMP画像やカメラからQRを読み取り。画像をアップロードせず、内容を確認してから自分でリンクを開けます。',
      questions: [
        ['どの画像に対応していますか？', '20 MB・4000万画素未満のPNG、JPEG、GIF、WebP、BMPに対応します。コード全体と明るい余白が見える鮮明な画像を選んでください。一度に1つのコードを読み取り、アニメーションは静止フレームとして扱います。'],
        ['リンクは自動的に開きますか？', 'いいえ。結果をまずテキストで表示し、HTTP・HTTPSだけに任意のリンクボタンを付けます。他の内容は実行せず、ログインやWi-Fi接続も行いません。'],
        ['カメラの許可が必要ですか？', 'カメラは任意で、HTTPSサイトでブラウザの許可が必要です。音声は要求しません。読み取り成功、タブ非表示、ページ離脱、作成モードへの切り替えで停止します。'],
      ],
    },
  },
  ko: {
    faqHeading: 'QR 코드 질문',
    home: {
      title: '무료 온라인 QR 코드 생성 및 읽기',
      description: 'URL, 텍스트, Wi-Fi, 이메일, SMS, vCard 연락처 정적 QR 코드를 무료로 만드세요. 색상 변경, PNG·SVG 저장, 이미지 읽기를 업로드 없이 처리합니다.',
      summary: '링크, 텍스트, Wi-Fi, 이메일, SMS, 연락처 QR 코드를 무료로 만들고 PNG·SVG로 저장하거나 이미지에서 QR 코드를 읽으세요.',
      questions: [
        ['무료인가요? 정적 QR 코드인가요?', '계정 없이 무료 정적 QR 코드를 만듭니다. 내용은 이미지 자체에 저장되며 QR Tools의 리디렉션을 거치지 않습니다. 내용 변경 시 새 이미지를 생성하고 공유해야 합니다.'],
        ['내용이나 이미지를 업로드하거나 저장하나요?', 'QR 내용, Wi-Fi 비밀번호, 선택한 이미지는 브라우저에서 처리합니다. 사이트는 업로드하거나 기록을 저장하지 않습니다. 다운로드하거나 공유한 QR 이미지에는 입력 정보가 포함됩니다.'],
        ['PNG와 SVG 중 무엇을 선택해야 하나요?', 'PNG는 이미지 공유와 문서에, 크기를 바꿔도 선명한 SVG는 인쇄에 적합합니다. 두 형식의 내용은 같습니다. 밝은 여백을 유지하고 어두운 코드와 밝은 배경을 사용하세요.'],
        ['다른 브라우저 탭을 가져올 수 있나요?', '사이트에 페이지 URL을 붙여 넣으세요. Safari와 Chrome 확장 프로그램은 현재 탭 주소를 직접 가져오지만 사이트는 다른 탭을 읽을 수 없습니다.'],
      ],
    },
    wifi: {
      title: '무료 Wi-Fi QR 코드 생성기 | 게스트·숨겨진 네트워크',
      description: '이름, 비밀번호, WPA/WPA2/WPA3, WEP, 공개·숨겨진 네트워크의 Wi-Fi QR 코드를 생성하세요. 비밀번호 업로드 없이 PNG·SVG로 저장합니다.',
      questions: [
        ['손님은 Wi-Fi QR 코드로 어떻게 연결하나요?', '코드에는 네트워크 이름, 보안 유형, 비밀번호 및 선택한 숨김 표시가 포함됩니다. 호환되는 휴대폰으로 스캔하고 연결을 확인하세요. 지원 여부는 기기에 따라 다르며 이 도구는 라우터를 설정하지 않습니다.'],
        ['QR 코드의 Wi-Fi 비밀번호는 암호화되나요?', '아닙니다. 이미지를 가진 사람은 비밀번호를 읽을 수 있습니다. 게스트 네트워크를 사용하고 접근을 허용할 사람에게만 공유하세요. 암호 기반 WPA, WEP, 공개 네트워크를 지원하며 기업 로그인이나 인증서 프로필은 지원하지 않습니다.'],
        ['비밀번호를 바꾸면 코드도 업데이트되나요?', '자동 업데이트되지 않습니다. 새 정보로 QR 코드를 다시 생성하세요. 이전 이미지에는 이전 비밀번호가 남습니다.'],
      ],
    },
    contact: {
      title: '무료 vCard 연락처 QR 코드 생성기 | 명함',
      description: '이름, 전화, 이메일, 회사, 웹사이트를 vCard 3.0 정적 연락처 QR 코드로 만드세요. 계정 없이 PNG·SVG 명함으로 내보냅니다.',
      questions: [
        ['연락처 QR 코드에는 무엇이 포함되나요?', '이름과 선택한 전화번호, 이메일, 조직, 웹사이트를 vCard 3.0 기록으로 인코딩합니다. 호환되는 스캐너에서 연락처 추가를 제안할 수 있습니다.'],
        ['배포한 명함의 내용을 수정할 수 있나요?', '정적 vCard QR 코드이며 호스팅된 온라인 프로필이 아닙니다. 전화번호 등이 변경되면 새 이미지를 만들어 이전 코드를 교체하세요.'],
        ['어떤 연락처 정보를 공유해야 하나요?', '받는 사람에게 제공하려는 정보만 입력하세요. QR 이미지는 복사할 수 있으며 이미지를 가진 사람이 내용을 읽을 수 있습니다. 계정이 필요 없고 사이트는 명함을 저장하지 않습니다.'],
      ],
    },
    reader: {
      title: '무료 온라인 QR 코드 리더 | 이미지·카메라 스캔',
      description: 'PNG, JPEG, GIF, WebP, BMP 이미지 또는 카메라에서 QR을 읽으세요. 업로드 없이 로컬에서 해독하고 내용을 확인한 뒤 직접 링크를 여세요.',
      questions: [
        ['어떤 이미지 형식을 지원하나요?', '20 MB 및 4천만 화소 미만의 PNG, JPEG, GIF, WebP, BMP를 지원합니다. 코드 전체와 밝은 여백이 보이는 선명한 이미지를 선택하세요. 한 번에 하나의 코드를 읽으며 애니메이션은 정지 프레임으로 처리합니다.'],
        ['스캔하면 링크가 자동으로 열리나요?', '아닙니다. 내용을 먼저 텍스트로 표시하고 HTTP·HTTPS에만 선택적 링크 버튼을 제공합니다. 다른 내용은 실행하지 않으며 로그인이나 Wi-Fi 연결도 수행하지 않습니다.'],
        ['카메라 권한이 필요한가요?', '카메라는 선택 기능으로 HTTPS 사이트에서 브라우저 권한이 필요합니다. 오디오는 요청하지 않습니다. 코드 인식, 탭 숨김, 페이지 종료, 생성 모드로 전환 시 중지합니다.'],
      ],
    },
  },
  de: {
    faqHeading: 'Fragen zu QR-Codes',
    home: {
      title: 'Kostenloser Online-QR-Generator und QR-Leser',
      description: 'Statische QR-Codes für URL, Text, WLAN, E-Mail, SMS und vCard erstellen. Farben ändern, PNG oder SVG exportieren und QR-Bilder ohne Upload lesen.',
      summary: 'Kostenlose QR-Codes für Links, Text, WLAN, E-Mail, SMS und Kontaktkarten erstellen, als PNG oder SVG speichern und QR-Bilder lesen.',
      questions: [
        ['Sind die QR-Codes kostenlos und statisch?', 'Die Website erstellt kostenlose statische QR-Codes ohne Konto. Der Inhalt steckt im Bild selbst und nutzt keinen QR-Tools-Weiterleitungsdienst. Für Änderungen musst du ein neues Bild erstellen und teilen.'],
        ['Werden meine Daten hochgeladen oder gespeichert?', 'QR-Inhalte, WLAN-Passwörter und ausgewählte Bilder werden im Browser verarbeitet. Die Website lädt sie nicht hoch und speichert keinen Verlauf. Heruntergeladene oder geteilte QR-Bilder enthalten deine eingegebenen Daten.'],
        ['Soll ich PNG oder SVG herunterladen?', 'PNG eignet sich zum Teilen von Bildern und für Dokumente. SVG bleibt beim Vergrößern scharf und eignet sich zum Drucken. Beide enthalten dieselben Daten. Den hellen Rand erhalten und einen dunklen Code auf hellem Hintergrund verwenden.'],
        ['Kann die Website einen anderen Tab erfassen?', 'Füge die Seiten-URL auf der Website ein. Die Safari- und Chrome-Erweiterungen erfassen die URL des aktuellen Tabs direkt; die Website kann deine anderen Tabs nicht lesen.'],
      ],
    },
    wifi: {
      title: 'Kostenloser WLAN-QR-Generator für Gäste',
      description: 'WLAN-QR-Code mit Name, Passwort, WPA/WPA2/WPA3, WEP, offenem oder verborgenem Netzwerk erstellen. PNG/SVG herunterladen, ohne Passwort-Upload.',
      questions: [
        ['Wie verbindet sich ein Gast mit dem WLAN-QR-Code?', 'Der Code enthält Netzwerkname, Sicherheit, Passwort und bei Auswahl die Kennzeichnung als verborgenes Netzwerk. Mit einem kompatiblen Handy scannen und die Verbindung bestätigen. Die Unterstützung hängt vom Gerät ab; das Tool konfiguriert keinen Router.'],
        ['Ist das WLAN-Passwort im QR-Code verschlüsselt?', 'Nein. Jeder mit dem QR-Bild kann das Passwort auslesen. Teile ein Gastnetzwerk nur mit berechtigten Personen. Unterstützt werden passwortbasiertes WPA, WEP und offene Netze, keine Unternehmensanmeldung oder Zertifikatprofile.'],
        ['Aktualisiert sich der Code bei Passwortänderung?', 'Nein. Erstelle mit den neuen Daten einen neuen Code. Das alte Bild enthält weiterhin das alte Passwort.'],
      ],
    },
    contact: {
      title: 'Kostenloser vCard-QR-Generator für Kontaktkarten',
      description: 'Name, Telefon, E-Mail, Firma und Website als statischen vCard-3.0-QR-Code teilen. Kontaktkarte ohne Konto als PNG oder SVG exportieren.',
      questions: [
        ['Was enthält ein Kontakt-QR-Code?', 'Er codiert eine vCard-3.0-Datei mit Namen und optional Telefon, E-Mail, Organisation und Website. Ein kompatibler Scanner kann anbieten, diese Daten als Kontakt zu speichern.'],
        ['Kann ich eine verteilte Kontaktkarte aktualisieren?', 'Dies ist ein statischer vCard-Code, kein gehostetes Onlineprofil. Ändern sich Telefonnummer oder andere Daten, erstelle ein neues Bild und ersetze den verteilten Code.'],
        ['Welche Kontaktdaten sollte ich teilen?', 'Gib nur die Daten ein, die Empfänger erhalten sollen. QR-Bilder können kopiert und von jedem mit dem Bild gelesen werden. Die Website benötigt kein Konto und speichert deine Kontaktkarte nicht.'],
      ],
    },
    reader: {
      title: 'Kostenloser Online-QR-Leser für Bilder und Kamera',
      description: 'QR-Codes aus PNG, JPEG, GIF, WebP, BMP oder per Kamera lesen. Lokal ohne Bild-Upload decodieren, Inhalt prüfen und Links selbst öffnen.',
      questions: [
        ['Welche Bilder werden unterstützt?', 'PNG, JPEG, GIF, WebP und BMP unter 20 MB und 40 Megapixeln. Wähle ein scharfes Bild mit vollständigem Code und hellem Rand. Es wird jeweils ein QR-Code gelesen; Animationen werden als Einzelbild behandelt.'],
        ['Werden Links nach dem Scannen automatisch geöffnet?', 'Nein. Der Inhalt wird zuerst als Text angezeigt. Nur HTTP- und HTTPS-Adressen erhalten einen optionalen Link-Button. Andere Inhalte werden nicht ausgeführt, und es erfolgt keine Anmeldung oder WLAN-Verbindung.'],
        ['Braucht der Kamera-Scan eine Berechtigung?', 'Die Kamera ist optional und erfordert eine Browserberechtigung auf HTTPS. Audio wird nicht angefordert. Sie stoppt bei erkanntem Code, verborgenem Tab, Seitenwechsel oder Wechsel zu Erstellen.'],
      ],
    },
  },
  fr: {
    faqHeading: 'Questions sur les QR codes',
    home: {
      title: 'Générateur et lecteur de QR codes gratuits en ligne',
      description: 'Créez des QR statiques pour URL, texte, Wi-Fi, e-mail, SMS et vCard. Couleurs, export PNG/SVG et lecture d’images dans le navigateur, sans envoi.',
      summary: 'Créez gratuitement un QR pour un lien, du texte, un réseau Wi-Fi, un e-mail, un SMS ou une carte de contact. Exportez en PNG/SVG ou lisez une image QR.',
      questions: [
        ['Ces QR codes sont-ils gratuits et statiques ?', 'Le site crée des QR statiques gratuits sans compte. Le contenu est dans l’image, sans service de redirection QR Tools. Pour modifier les données, créez et partagez une nouvelle image.'],
        ['Mes données sont-elles envoyées ou enregistrées ?', 'Le contenu QR, les mots de passe Wi-Fi et les images choisies sont traités dans le navigateur. Le site ne les envoie pas et ne conserve pas d’historique. Les images téléchargées ou partagées contiennent les données saisies.'],
        ['Faut-il choisir PNG ou SVG ?', 'PNG convient au partage d’images et aux documents. SVG reste net à toute taille pour l’impression. Le contenu est identique. Gardez la marge claire et utilisez un code sombre sur fond clair.'],
        ['Le site peut-il lire un autre onglet ?', 'Collez l’URL de la page sur le site. Les extensions Safari et Chrome récupèrent directement l’URL de l’onglet actuel ; le site ne peut pas lire vos autres onglets.'],
      ],
    },
    wifi: {
      title: 'Générateur gratuit de QR Wi-Fi pour invités',
      description: 'Créez un QR Wi-Fi avec nom, mot de passe, WPA/WPA2/WPA3, WEP, réseau ouvert ou masqué. Export PNG/SVG sans envoi du mot de passe.',
      questions: [
        ['Comment un invité se connecte-t-il avec le QR Wi-Fi ?', 'Le code contient le nom, la sécurité, le mot de passe et, si choisi, l’indication de réseau masqué. Scannez avec un téléphone compatible puis confirmez la connexion. La compatibilité dépend du téléphone ; cet outil ne configure pas le routeur.'],
        ['Le mot de passe est-il chiffré dans le QR ?', 'Non. Toute personne disposant de l’image peut lire le mot de passe. Partagez un réseau invité uniquement avec les personnes autorisées. WPA à mot de passe, WEP et réseaux ouverts sont pris en charge, pas les comptes d’entreprise ni les certificats.'],
        ['Le QR change-t-il quand le mot de passe change ?', 'Non. Créez un nouveau QR avec les nouvelles données. L’ancienne image contient toujours l’ancien mot de passe.'],
      ],
    },
    contact: {
      title: 'Générateur gratuit de QR vCard et cartes de contact',
      description: 'Créez un QR de contact statique vCard 3.0 : nom, téléphone, e-mail, société et site. Exportez la carte en PNG ou SVG sans compte.',
      questions: [
        ['Que contient un QR de contact ?', 'Il encode un enregistrement vCard 3.0 avec le nom et, au choix, téléphone, e-mail, organisation et site. Un lecteur compatible peut proposer de l’ajouter aux contacts.'],
        ['Puis-je modifier une carte déjà distribuée ?', 'Ce QR vCard est statique, ce n’est pas un profil hébergé. Pour changer les coordonnées, créez une nouvelle image et remplacez le code distribué.'],
        ['Quelles coordonnées faut-il partager ?', 'Ne saisissez que les informations destinées au destinataire. Toute personne possédant l’image QR peut la copier et la lire. Le site ne demande pas de compte et ne sauvegarde pas la carte.'],
      ],
    },
    reader: {
      title: 'Lecteur QR gratuit en ligne : images et caméra',
      description: 'Lisez des QR sur PNG, JPEG, GIF, WebP, BMP ou avec la caméra. Décodage local sans envoi d’image ; vérifiez le contenu puis ouvrez le lien.',
      questions: [
        ['Quelles images sont prises en charge ?', 'PNG, JPEG, GIF, WebP et BMP de moins de 20 Mo et 40 mégapixels. Choisissez une image nette avec le code entier et sa marge claire. Un seul QR est lu à la fois ; une animation est traitée comme une image fixe.'],
        ['Le lecteur ouvre-t-il automatiquement les liens ?', 'Non. Le contenu est d’abord affiché en texte. Seules les adresses HTTP et HTTPS ont un bouton facultatif pour ouvrir le lien. Les autres données ne sont pas exécutées et le lecteur ne vous connecte pas à un compte ou au Wi-Fi.'],
        ['La caméra nécessite-t-elle une autorisation ?', 'La caméra est facultative et nécessite l’autorisation du navigateur sur HTTPS. Aucun son n’est demandé. Elle s’arrête après lecture, si l’onglet est masqué, en quittant la page ou en revenant au mode Créer.'],
      ],
    },
  },
  es: {
    faqHeading: 'Preguntas sobre códigos QR',
    home: {
      title: 'Generador y lector QR gratis en línea',
      description: 'Crea QR estáticos para URL, texto, Wi-Fi, correo, SMS y vCard. Personaliza colores, exporta PNG/SVG y lee imágenes en el navegador sin subirlas.',
      summary: 'Crea gratis un QR para enlaces, texto, Wi-Fi, correo, SMS o tarjetas de contacto. Descarga PNG/SVG o lee el QR de una imagen.',
      questions: [
        ['¿Los QR son gratuitos y estáticos?', 'El sitio genera QR estáticos gratis sin cuenta. El contenido está en la imagen, sin un servicio de redirección de QR Tools. Para cambiarlo debes generar y compartir una imagen nueva.'],
        ['¿Se suben o guardan mis datos?', 'El contenido QR, las contraseñas Wi-Fi y las imágenes se procesan en el navegador. El sitio no los sube ni guarda historial. Las imágenes descargadas o compartidas contienen los datos introducidos.'],
        ['¿Debo elegir PNG o SVG?', 'PNG sirve para compartir imágenes y documentos. SVG mantiene su nitidez al cambiar de tamaño para imprimir. Ambos contienen lo mismo. Conserva el margen claro y usa un código oscuro sobre fondo claro.'],
        ['¿Puede el sitio leer otra pestaña?', 'Pega la URL de la página en el sitio. Las extensiones Safari y Chrome obtienen directamente la URL de la pestaña actual; el sitio no puede leer otras pestañas.'],
      ],
    },
    wifi: {
      title: 'Generador gratis de QR Wi-Fi para invitados',
      description: 'Crea un QR Wi-Fi con nombre, contraseña, WPA/WPA2/WPA3, WEP y redes abiertas u ocultas. Descarga PNG/SVG sin subir la contraseña.',
      questions: [
        ['¿Cómo conecta a un invitado el QR Wi-Fi?', 'El código contiene nombre de red, seguridad, contraseña y, si se selecciona, la marca de red oculta. Escanéalo con un móvil compatible y confirma la conexión. Depende del dispositivo; la herramienta no configura el router.'],
        ['¿La contraseña está cifrada en el QR?', 'No. Quien tenga la imagen puede leer la contraseña. Comparte una red de invitados solo con personas autorizadas. Se admiten WPA con contraseña, WEP y redes abiertas, no cuentas empresariales ni perfiles de certificados.'],
        ['¿Se actualiza al cambiar la contraseña?', 'No. Genera otro QR con los datos nuevos. La imagen anterior conserva la contraseña anterior.'],
      ],
    },
    contact: {
      title: 'Generador QR vCard gratis para contactos',
      description: 'Crea un QR estático vCard 3.0 con nombre, teléfono, correo, empresa y web. Exporta tu tarjeta de contacto a PNG o SVG sin cuenta.',
      questions: [
        ['¿Qué contiene un QR de contacto?', 'Codifica un registro vCard 3.0 con el nombre y los datos opcionales de teléfono, correo, organización y web. Un lector compatible puede ofrecer añadirlos a los contactos.'],
        ['¿Puedo actualizar una tarjeta ya distribuida?', 'Es un QR vCard estático, no un perfil alojado. Para cambiar el teléfono u otros datos debes generar una imagen nueva y reemplazar el código distribuido.'],
        ['¿Qué datos de contacto debo compartir?', 'Incluye solo los datos que quieras dar al destinatario. Cualquiera con la imagen puede copiarla y leerla. El sitio no exige cuenta ni guarda tu tarjeta.'],
      ],
    },
    reader: {
      title: 'Lector QR gratis en línea: imágenes y cámara',
      description: 'Lee QR de imágenes PNG, JPEG, GIF, WebP, BMP o de la cámara. Decodifica localmente sin subir imágenes; revisa el texto antes de abrir enlaces.',
      questions: [
        ['¿Qué imágenes puedo leer?', 'PNG, JPEG, GIF, WebP y BMP de menos de 20 MB y 40 megapíxeles. Usa una imagen nítida con el código completo y su margen claro. Se lee un QR a la vez; las animaciones se procesan como un fotograma fijo.'],
        ['¿Se abren los enlaces automáticamente?', 'No. Primero se muestra el texto. Solo las direcciones HTTP y HTTPS tienen un botón opcional para abrir el enlace. No se ejecutan otros contenidos ni se inicia sesión o conecta al Wi-Fi.'],
        ['¿La cámara necesita permiso?', 'La cámara es opcional y necesita permiso del navegador en HTTPS. No se solicita audio. Se detiene al encontrar un QR, ocultar la pestaña, salir de la página o volver al modo Crear.'],
      ],
    },
  },
};

for (const [code, content] of Object.entries(workflowSeo)) Object.assign(seo[code], content);
