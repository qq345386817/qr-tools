const codes = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'es'];
const definitions = {
  tools: ['Tools', '工具', '工具', 'ツール', '도구', 'Werkzeuge', 'Outils', 'Herramientas'],
  scan: ['Scan', '识别', '辨識', '読み取り', '스캔', 'Scannen', 'Scanner', 'Escanear'],
  pdf: ['Export PDF', '导出 PDF', '匯出 PDF', 'PDFを書き出す', 'PDF 내보내기', 'PDF exportieren', 'Exporter PDF', 'Exportar PDF'],
  png: ['Save PNG', '保存 PNG', '儲存 PNG', 'PNGを保存', 'PNG 저장', 'PNG speichern', 'Enregistrer PNG', 'Guardar PNG'],
  svg: ['Save SVG', '保存 SVG', '儲存 SVG', 'SVGを保存', 'SVG 저장', 'SVG speichern', 'Enregistrer SVG', 'Guardar SVG'],
  history: ['History', '历史', '歷史', '履歴', '기록', 'Verlauf', 'Historique', 'Historial'],
  settings: ['Settings', '设置', '設定', '設定', '설정', 'Einstellungen', 'Réglages', 'Ajustes'],
  save: ['Save', '保存', '儲存', '保存', '저장', 'Speichern', 'Enregistrer', 'Guardar'],
  saveHistory: ['Save to History', '保存到历史', '儲存至歷史', '履歴に保存', '기록에 저장', 'Im Verlauf speichern', 'Enregistrer dans l’historique', 'Guardar en historial'],
  paste: ['Paste', '粘贴', '貼上', 'ペースト', '붙여넣기', 'Einfügen', 'Coller', 'Pegar'],
  photos: ['Photos', '照片', '照片', '写真', '사진', 'Fotos', 'Photos', 'Fotos'],
  importFile: ['Import file', '导入文件', '匯入檔案', 'ファイルを読み込む', '파일 가져오기', 'Datei importieren', 'Importer un fichier', 'Importar archivo'],
  export: ['Export', '导出', '匯出', '書き出し', '내보내기', 'Exportieren', 'Exporter', 'Exportar'],
  generate: ['Generate', '生成', '產生', '作成', '생성', 'Erstellen', 'Générer', 'Generar'],
  preview: ['Preview', '预览', '預覽', 'プレビュー', '미리보기', 'Vorschau', 'Aperçu', 'Vista previa'],
  clear: ['Clear', '清空', '清除', '消去', '비우기', 'Leeren', 'Effacer', 'Vaciar'],
  remove: ['Delete', '删除', '刪除', '削除', '삭제', 'Löschen', 'Supprimer', 'Eliminar'],
  clearConfirm: ['Clear all saved QR codes?', '清空所有已保存的二维码？', '清除所有已儲存的 QR？', '保存したQRをすべて消去しますか？', '저장된 QR를 모두 지울까요?', 'Alle gespeicherten QR-Codes löschen?', 'Effacer tous les QR enregistrés ?', '¿Borrar todos los QR guardados?'],
  emptyHistory: ['No saved codes', '暂无已保存的二维码', '尚無已儲存的 QR', '保存したQRはありません', '저장된 코드 없음', 'Keine gespeicherten Codes', 'Aucun code enregistré', 'No hay códigos guardados'],
  done: ['Done', '完成', '完成', '完了', '완료', 'Fertig', 'Terminé', 'Listo'],
  error: ['Could not complete the operation', '操作未能完成', '操作未能完成', '操作を完了できません', '작업을 완료하지 못했습니다', 'Vorgang konnte nicht abgeschlossen werden', 'Impossible de terminer l’opération', 'No se pudo completar la operación'],
  offlineError: ['The offline engine is unavailable. Reopen the App.', '离线引擎不可用，请重新打开 App。', '離線引擎無法使用，請重新開啟 App。', 'オフラインエンジンを利用できません。アプリを開き直してください。', '오프라인 엔진을 사용할 수 없습니다. 앱을 다시 여세요.', 'Offline-Engine nicht verfügbar. App erneut öffnen.', 'Moteur hors ligne indisponible. Rouvrez l’app.', 'Motor sin conexión no disponible. Abre de nuevo la app.'],
  cameraPermission: ['Scan QR codes using your camera. Video stays on this device.', '使用相机扫描二维码，视频仅在此设备上处理。', '使用相機掃描 QR，影片僅在此裝置處理。', 'カメラでQRを読み取ります。映像は端末内で処理します。', '카메라로 QR를 스캔합니다. 영상은 이 기기에서만 처리됩니다.', 'QR-Codes mit der Kamera scannen. Video bleibt auf diesem Gerät.', 'Scanner des QR avec la caméra. La vidéo reste sur cet appareil.', 'Escanea QR con la cámara. El vídeo queda en este dispositivo.'],
  cameraUnavailable: ['Camera unavailable on this device', '此设备无法使用相机', '此裝置無法使用相機', 'この端末ではカメラを利用できません', '이 기기에서 카메라를 사용할 수 없음', 'Kamera auf diesem Gerät nicht verfügbar', 'Caméra indisponible sur cet appareil', 'Cámara no disponible en este dispositivo'],
  cameraDenied: ['Camera permission is required. You can import an image instead.', '需要相机权限，也可以改为导入图片。', '需要相機權限，也可改為匯入圖片。', 'カメラの許可が必要です。画像も読み込めます。', '카메라 권한이 필요합니다. 이미지를 가져올 수도 있습니다.', 'Kameraberechtigung erforderlich. Alternativ ein Bild importieren.', 'Autorisation caméra nécessaire. Vous pouvez importer une image.', 'Se requiere permiso de cámara. Puedes importar una imagen.'],
  importContact: ['Add contact', '添加联系人', '加入聯絡人', '連絡先に追加', '연락처 추가', 'Kontakt hinzufügen', 'Ajouter le contact', 'Añadir contacto'],
  addCalendar: ['Add to calendar', '添加到日历', '加入行事曆', 'カレンダーに追加', '캘린더에 추가', 'Zum Kalender hinzufügen', 'Ajouter au calendrier', 'Añadir al calendario'],
  fullScreen: ['Full-screen sign', '全屏展示牌', '全螢幕展示牌', '全画面の案内板', '전체 화면 안내판', 'Vollbildschild', 'Panneau plein écran', 'Cartel a pantalla completa'],
  saved: ['Saved locally', '已在本地保存', '已在本機儲存', '端末内に保存しました', '기기에 저장됨', 'Lokal gespeichert', 'Enregistré localement', 'Guardado localmente'],
  localOnly: ['QR data is processed on this device.', '二维码数据仅在此设备上处理。', 'QR 資料僅在此裝置處理。', 'QRデータは端末内で処理されます。', 'QR 데이터는 이 기기에서 처리됩니다.', 'QR-Daten werden auf diesem Gerät verarbeitet.', 'Les données QR sont traitées sur cet appareil.', 'Los datos QR se procesan en este dispositivo.'],
  staticWarning: ['Static QR. Anyone with the image can read its contents.', '静态二维码，持有图片的人可以读取其中的内容。', '靜態 QR，持有圖片的人皆可讀取內容。', '静的なQRです。画像の所持者は内容を読めます。', '정적 QR입니다. 이미지를 가진 사람은 내용을 읽을 수 있습니다.', 'Statischer QR. Jeder mit dem Bild kann den Inhalt lesen.', 'QR statique. Toute personne avec l’image peut lire son contenu.', 'QR estático. Quien tenga la imagen puede leer su contenido.'],
  loading: ['Loading', '正在加载', '載入中', '読み込み中', '로딩 중', 'Laden', 'Chargement', 'Cargando'],
};
export const nativeLabels = Object.fromEntries(codes.map((code, index) => [code, Object.fromEntries(Object.entries(definitions).map(([key, values]) => {
  if (values.length !== codes.length) throw new Error(`Missing native translation: ${key}`);
  return [key, values[index]];
}))]));
