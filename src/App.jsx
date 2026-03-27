import React, { useEffect, useMemo, useRef, useState } from "react";

console.log("🔥 NEW VERSION");

  function formatDate(dateStr) {
  if (!dateStr) return "";

  const rabbitStyle = `
@keyframes rabbitFloatA {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}

@keyframes rabbitFloatB {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}
`;
  

  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}/${m}/${day}`;
}
  
const API_BASE = "https://airdrops-production-4991.up.railway.app";
console.log("API_BASE now =", API_BASE);
const FREE_DAILY_LIMIT = 3;
const NAV_DELAY = 400;

/* ===================== i18n ===================== */
const translations = {
  gb: {
    title: "VOIDPULSE",
    subtitle: "Airdrop Intelligence Terminal",
    walletLabel: "Wallet Address",
    placeholder: "Enter 0x wallet address",
    queryBtn: "Scan for Airdrops",
    loading: "Scanning wallet activity...",
    freeTip: "Used {count}/3 today (Free)",
    memberActive: "PRO Access Enabled",
    expiry: "Expires",
    upgradeTitle: "Activate PRO",
    monthly: "Monthly Plan",
    yearly: "Yearly Plan",
    monthlyPrice: "4.99 USDT / month",
    yearlyPrice: "39.99 USDT / year",
    save: "Save 33%",
    hotAirdrops: "Hot Airdrops",
    quantity: "Amount",
    value: "Value",
    claimable: "Claimable",
    upcoming: "Coming Soon",
    invalidAddress: "Please enter a valid wallet address (0x..., 42 chars)",
    limitReached: "Free tier allows 3 checks per day. Please upgrade.",
    resultTitle: "Opportunity Panel",
    walletChecked: "Checked Wallet",
    score: "Score",
    estimatedValue: "Estimated Value",
    projects: "Matched Projects",
    recentCheck: "Recent Check",
    premiumTitle: "Unlock More Opportunities",
    premiumItem1: "Unlimited daily checks",
    premiumItem2: "Multi-chain wallet tracking",
    premiumItem3: "Earlier hot-airdrop alerts",
    premiumItem4: "High-value wallet analysis",
    choosePlan: "Choose Your Plan",
    claimStatus: "Claim Status",
    claimGuide: "How to Claim",
    gasToken: "Required Gas",
    claimNetwork: "Claim Network",
    officialClaim: "Official Claim",
    monitorOnly: "Monitor Official Announcement",
    autoAirdrop: "Auto Airdrop",
    manualClaim: "Manual Claim",
    predictedOnly: "Predicted Eligibility",
    step1: "Connect the wallet on the correct chain",
    step2: "Confirm your address is eligible",
    step3: "Prepare the required gas token",
    step4: "Open the official claim page and click Claim",
    step5: "Return to your wallet and check the assets",
    noLiveClaim: "Claim is not live yet. Please watch the official announcement.",
    officialHint:
      "Use only official links. Do not click unknown claim links from groups or DMs.",
    riskTitle: "Security Notice",
    risk1: "⚠ Never reveal your private key or seed phrase",
    risk2: "⚠ Always verify the official domain before claiming",
    risk3: "⚠ Do not sign approvals you do not understand",
    verifiedDomain: "Verified Domain",
    communitySource: "Community Source",
    unknownSource: "Unknown Source",
    deadline: "Deadline",
    sourceType: "Source",
    officialSite: "Official Site",
    payTitle: "Payment",
    paySubtitle: "On-chain payment, instant membership activation",
    payAmount: "Amount",
    payAddress: "Address",
    payNetwork: "Network",
    payToken: "Token",
    payOrder: "Order ID",
    payCopy: "Copy Address",
    payBack: "Back",
    payWaiting: "Creating order...",
    payReady: "Ready to pay",
    payPaid: "Paid, returning...",
    highValueDetected: "Potential High-Value Airdrop Opportunity Detected",
    riskNotice: "⚠ Some airdrops may expire soon",
    paymentTrust1: "✔ Polygon on-chain payment",
    paymentTrust2: "✔ No approval required, only transfer USDT",
    paymentTrust3: "✔ Membership activates automatically after payment",
    walletHint: "Use a Polygon-supported wallet to scan and pay",
    riskTransfer: "⚠ Do not send on the wrong network",
    redirecting: "Redirecting",
    unlockTitle: "Unlock Full Paid Panel",
    unlockSub: "Activate now to see more matched airdrops and claim entries",
    cancel: "Cancel",
    paidAlready: "This session already has PRO access",
    backHome: "Back Home",
    backToScanner: "Back to Scanner",
    claimNow: "Claim Now",
    inspectMore: "Open Site",
    scanAgain: "Scan Again",
    realSignals: "Live query + local estimate",
    planMonthlyHint: "Best for short-term testing",
    planYearlyHint: "Best for long-term tracking",
    paymentCheckFailed: "Membership check failed",
    createOrderFailed: "Create order failed",
    noResultTitle: "No result yet",
    lockedRouteTitle: "Hidden PRO Route",
    lockedRouteDesc: "{count} additional matched opportunities are hidden",
    lockedPotentialValue: "Potential value: •••",
    lockedClaimPath: "Claim path: PRO only",
    lockedSignalHint: "Advanced eligibility signals detected",
    unlockingRoutes: "Unlocking advanced routes...",
    potentialTitle: "Potential Airdrop Opportunities",
    claimableTitle: "Claimable Airdrops Detected",
    unlockContact: "Contact support to unlock full airdrop access",
    exactPayHint: "Por favor, pague exactamente la cantidad mostrada, de lo contrario el sistema puede no reconocer el pago",
  },

  hk: {
    title: "VOIDPULSE",
    subtitle: "Airdrop Intelligence Terminal",
    walletLabel: "錢包地址",
    placeholder: "請輸入 0x 錢包地址",
    queryBtn: "立即挖掘空投",
    loading: "正在掃描錢包活動...",
    freeTip: "今日已用 {count}/3 次（免費版）",
    memberActive: "PRO 盈利權限已開啟",
    expiry: "到期",
    upgradeTitle: "立即開通 PRO",
    monthly: "月付方案",
    yearly: "年付方案",
    monthlyPrice: "4.99 USDT / 月",
    yearlyPrice: "39.99 USDT / 年",
    save: "省 33%",
    hotAirdrops: "熱門空投",
    quantity: "數量",
    value: "價值",
    claimable: "可領取",
    upcoming: "即將公佈",
    invalidAddress: "請輸入正確的錢包地址（0x 開頭，42 位）",
    limitReached: "免費版每天限查 3 次，請升級會員！",
    resultTitle: "盈利機會面板",
    walletChecked: "已查詢地址",
    score: "空投活躍度",
    estimatedValue: "預估價值",
    projects: "匹配項目",
    recentCheck: "最近一次查詢",
    premiumTitle: "解鎖更多盈利機會",
    premiumItem1: "每日不限次查詢",
    premiumItem2: "多鏈地址追蹤",
    premiumItem3: "更早獲取熱門空投提醒",
    premiumItem4: "高價值地址標記分析",
    choosePlan: "選擇你的方案",
    claimStatus: "領取狀態",
    claimGuide: "領取方式",
    gasToken: "所需 Gas",
    claimNetwork: "領取網絡",
    officialClaim: "官方領取",
    monitorOnly: "等待官方公告",
    autoAirdrop: "自動發放",
    manualClaim: "手動領取",
    predictedOnly: "預測資格",
    step1: "連接對應鏈錢包",
    step2: "確認地址是否符合資格",
    step3: "準備對應鏈 Gas",
    step4: "前往官方頁面點擊 Claim",
    step5: "領取後回到錢包檢查資產",
    noLiveClaim: "目前還未正式開放領取，建議持續關注官方公告。",
    officialHint: "請只使用官方鏈接，不要從陌生群組或私訊中點擊。",
    riskTitle: "安全提示",
    risk1: "⚠ 永遠不要透露私鑰或助記詞",
    risk2: "⚠ 領取前務必核對官方域名",
    risk3: "⚠ 不要簽署你看不懂的授權",
    verifiedDomain: "已驗證來源",
    communitySource: "社群來源",
    unknownSource: "未知來源",
    deadline: "截止時間",
    sourceType: "來源狀態",
    officialSite: "官方網站",
    payTitle: "支付頁面",
    paySubtitle: "鏈上支付，自動開通會員",
    payAmount: "金額",
    payAddress: "地址",
    payNetwork: "網絡",
    payToken: "代幣",
    payOrder: "訂單號",
    payCopy: "複製地址",
    payBack: "返回",
    payWaiting: "等待建立訂單...",
    payReady: "請付款",
    payPaid: "已付款，正在返回...",
    highValueDetected: "檢測到潛在高價值空投機會",
    riskNotice: "⚠ 部分空投可能即將結束",
    paymentTrust1: "✔ Polygon 鏈上支付",
    paymentTrust2: "✔ 無需授權，僅轉帳 USDT",
    paymentTrust3: "✔ 支付後自動開通會員",
    walletHint: "請使用支援 Polygon 的錢包掃碼支付",
    riskTransfer: "⚠ 請勿轉錯網絡，否則資產可能遺失",
    redirecting: "正在跳轉",
    unlockTitle: "解鎖完整付費面板",
    unlockSub: "立即開通，查看更多匹配空投與領取入口",
    cancel: "取消",
    paidAlready: "此 Session 已開通會員",
    backHome: "返回首頁",
    backToScanner: "返回掃描頁",
    claimNow: "立即領取",
    inspectMore: "查看更多",
    scanAgain: "再次查詢",
    realSignals: "真實查詢 ",
    planMonthlyHint: "適合短期測試",
    planYearlyHint: "適合長期追蹤",
    paymentCheckFailed: "會員狀態檢查失敗",
    createOrderFailed: "建立訂單失敗",
    noResultTitle: "暫無結果",
    lockedRouteTitle: "隱藏的 PRO 路線",
    lockedRouteDesc: "還有 {count} 個匹配機會已被隱藏",
    lockedPotentialValue: "潛在價值：•••",
    lockedClaimPath: "領取路徑：僅限 PRO",
    lockedSignalHint: "已檢測到進階資格信號",
    unlockingRoutes: "正在解鎖進階路線...",
    potentialTitle: "潛在空投機會",
    claimableTitle: "已檢測到可領取空投",
    unlockContact: "聯繫客服解鎖完整空投路徑",
    exactPayHint: "請嚴格按照顯示金額支付，否則系統可能無法自動識別訂單",
  },

  jp: {
    title: "VOIDPULSE",
    subtitle: "Airdrop Intelligence Terminal",
    walletLabel: "ウォレットアドレス",
    placeholder: "0x ウォレットアドレスを入力してください",
    queryBtn: "エアドロップを検索",
    loading: "ウォレット活動をスキャン中...",
    freeTip: "本日 {count}/3 回使用済み（無料）",
    memberActive: "PRO アクセス有効",
    expiry: "有効期限",
    upgradeTitle: "PRO を有効化",
    monthly: "月額プラン",
    yearly: "年額プラン",
    monthlyPrice: "4.99 USDT / 月",
    yearlyPrice: "39.99 USDT / 年",
    save: "33%節約",
    hotAirdrops: "注目のエアドロップ",
    quantity: "数量",
    value: "価値",
    claimable: "請求可能",
    upcoming: "近日公開",
    invalidAddress: "有効なウォレットアドレスを入力してください（0x..., 42文字）",
    limitReached: "無料版は1日3回までです。アップグレードしてください。",
    resultTitle: "機会パネル",
    walletChecked: "確認済みアドレス",
    score: "スコア",
    estimatedValue: "推定価値",
    projects: "一致プロジェクト",
    recentCheck: "最近の検索",
    premiumTitle: "さらに多くの機会を解放",
    premiumItem1: "毎日の検索回数が無制限",
    premiumItem2: "マルチチェーン追跡",
    premiumItem3: "より早いアラート",
    premiumItem4: "高価値アドレス分析",
    choosePlan: "プランを選択",
    claimStatus: "受取状況",
    claimGuide: "受取方法",
    gasToken: "必要ガス",
    claimNetwork: "受取ネットワーク",
    officialClaim: "公式請求",
    monitorOnly: "公式発表を確認",
    autoAirdrop: "自動配布",
    manualClaim: "手動請求",
    predictedOnly: "予測資格",
    step1: "正しいチェーンでウォレットを接続",
    step2: "対象アドレスか確認",
    step3: "必要なガストークンを準備",
    step4: "公式ページで Claim をクリック",
    step5: "ウォレットに戻って資産を確認",
    noLiveClaim: "まだ請求開始していません。公式発表を確認してください。",
    officialHint: "必ず公式リンクのみを使用してください。",
    riskTitle: "セキュリティ通知",
    risk1: "⚠ 秘密鍵やシードフレーズを共有しない",
    risk2: "⚠ 必ず公式ドメインを確認する",
    risk3: "⚠ 理解できない承認に署名しない",
    verifiedDomain: "検証済みドメイン",
    communitySource: "コミュニティ情報",
    unknownSource: "不明な情報源",
    deadline: "締切",
    sourceType: "情報源",
    officialSite: "公式サイト",
    payTitle: "支払い",
    paySubtitle: "オンチェーン決済で即時メンバーシップ有効化",
    payAmount: "金額",
    payAddress: "アドレス",
    payNetwork: "ネットワーク",
    payToken: "トークン",
    payOrder: "注文番号",
    payCopy: "アドレスをコピー",
    payBack: "戻る",
    payWaiting: "注文を作成中...",
    payReady: "支払いの準備完了",
    payPaid: "支払い済み、戻ります...",
    highValueDetected: "高価値エアドロップの可能性を検出",
    riskNotice: "⚠ 一部のエアドロップは期限が近い可能性があります",
    paymentTrust1: "✔ Polygon オンチェーン決済",
    paymentTrust2: "✔ 承認不要、USDT送金のみ",
    paymentTrust3: "✔ 支払い後に自動で会員化",
    walletHint: "Polygon 対応ウォレットでスキャンして支払ってください",
    riskTransfer: "⚠ 間違ったネットワークへ送金しないでください",
    redirecting: "移動中",
    unlockTitle: "有料パネルを解放",
    unlockSub: "今すぐ有効化して、より多くの一致結果と請求入口を表示",
    cancel: "キャンセル",
    paidAlready: "このセッションは既に PRO が有効です",
    backHome: "ホームへ戻る",
    backToScanner: "スキャナーへ戻る",
    claimNow: "今すぐ請求",
    inspectMore: "サイトを開く",
    scanAgain: "再検索",
    realSignals: "実際の検索 + ローカル推定",
    planMonthlyHint: "短期テスト向け",
    planYearlyHint: "長期追跡向け",
    paymentCheckFailed: "会員状態の確認に失敗しました",
    createOrderFailed: "注文の作成に失敗しました",
    noResultTitle: "結果はまだありません",
    lockedRouteTitle: "非表示の PRO ルート",
    lockedRouteDesc: "さらに {count} 件の一致機会が非表示です",
    lockedPotentialValue: "想定価値: •••",
    lockedClaimPath: "請求ルート: PRO 限定",
    lockedSignalHint: "高度な適格性シグナルを検出",
    unlockingRoutes: "高度なルートを解放中...",
    potentialTitle: "潜在的なエアドロップ機会",
    claimableTitle: "受け取り可能なエアドロップを検出",
    unlockContact: "サポートに連絡してすべてのエアドロップを解放",
    exactPayHint: "表示された金額を正確にお支払いください。そうでない場合、システムが支払いを認識できない可能性があります",
  },

  es: {
    title: "VOIDPULSE",
    subtitle: "Airdrop Intelligence Terminal",
    walletLabel: "Dirección de wallet",
    placeholder: "Introduce una dirección 0x",
    queryBtn: "Buscar airdrops",
    loading: "Escaneando actividad de la wallet...",
    freeTip: "Usado {count}/3 hoy (Gratis)",
    memberActive: "PRO activado",
    expiry: "Expira",
    upgradeTitle: "Activar PRO",
    monthly: "Plan mensual",
    yearly: "Plan anual",
    monthlyPrice: "4.99 USDT / mes",
    yearlyPrice: "39.99 USDT / año",
    save: "Ahorra 33%",
    hotAirdrops: "Airdrops destacados",
    quantity: "Cantidad",
    value: "Valor",
    claimable: "Reclamable",
    upcoming: "Próximamente",
    invalidAddress: "Introduce una dirección válida (0x..., 42 caracteres)",
    limitReached: "La versión gratuita permite 3 consultas por día.",
    resultTitle: "Panel de oportunidades",
    walletChecked: "Wallet consultada",
    score: "Puntuación",
    estimatedValue: "Valor estimado",
    projects: "Proyectos coincidentes",
    recentCheck: "Consulta reciente",
    premiumTitle: "Desbloquea más oportunidades",
    premiumItem1: "Consultas diarias ilimitadas",
    premiumItem2: "Seguimiento multichain",
    premiumItem3: "Alertas más tempranas",
    premiumItem4: "Análisis de wallets de alto valor",
    choosePlan: "Elige tu plan",
    claimStatus: "Estado",
    claimGuide: "Cómo reclamar",
    gasToken: "Gas requerido",
    claimNetwork: "Red",
    officialClaim: "Reclamo oficial",
    monitorOnly: "Seguir anuncio oficial",
    autoAirdrop: "Distribución automática",
    manualClaim: "Reclamo manual",
    predictedOnly: "Elegibilidad estimada",
    step1: "Conecta la wallet en la red correcta",
    step2: "Confirma si la dirección es elegible",
    step3: "Prepara el token de gas necesario",
    step4: "Abre la página oficial y pulsa Claim",
    step5: "Vuelve a tu wallet y revisa los activos",
    noLiveClaim: "El reclamo aún no está activo.",
    officialHint: "Usa solo enlaces oficiales.",
    riskTitle: "Aviso de seguridad",
    risk1: "⚠ Nunca reveles tu clave privada o semilla",
    risk2: "⚠ Verifica siempre el dominio oficial",
    risk3: "⚠ No firmes aprobaciones que no entiendas",
    verifiedDomain: "Dominio verificado",
    communitySource: "Fuente comunitaria",
    unknownSource: "Fuente desconocida",
    deadline: "Fecha límite",
    sourceType: "Fuente",
    officialSite: "Sitio oficial",
    payTitle: "Pago",
    paySubtitle: "Pago on-chain y activación instantánea",
    payAmount: "Importe",
    payAddress: "Dirección",
    payNetwork: "Red",
    payToken: "Token",
    payOrder: "Pedido",
    payCopy: "Copiar dirección",
    payBack: "Volver",
    payWaiting: "Creando pedido...",
    payReady: "Listo para pagar",
    payPaid: "Pagado, volviendo...",
    highValueDetected: "Oportunidad potencial de alto valor detectada",
    riskNotice: "⚠ Algunas oportunidades pueden expirar pronto",
    paymentTrust1: "✔ Pago on-chain en Polygon",
    paymentTrust2: "✔ Sin aprobación, solo transferir USDT",
    paymentTrust3: "✔ Activación automática después del pago",
    walletHint: "Usa una wallet compatible con Polygon",
    riskTransfer: "⚠ No envíes a la red equivocada",
    redirecting: "Redirigiendo",
    unlockTitle: "Desbloquear panel completo",
    unlockSub: "Activa ahora para ver más señales y accesos de reclamo",
    cancel: "Cancelar",
    paidAlready: "Esta sesión ya tiene PRO",
    backHome: "Volver al inicio",
    backToScanner: "Volver al escáner",
    claimNow: "Reclamar ahora",
    inspectMore: "Abrir sitio",
    scanAgain: "Volver a consultar",
    realSignals: "Consulta real + estimación local",
    planMonthlyHint: "Ideal para pruebas cortas",
    planYearlyHint: "Ideal para seguimiento largo",
    paymentCheckFailed: "Fallo al comprobar la membresía",
    createOrderFailed: "Fallo al crear la orden",
    noResultTitle: "Aún no hay resultados",
    lockedRouteTitle: "Ruta PRO oculta",
    lockedRouteDesc: "Hay {count} oportunidades adicionales ocultas",
    lockedPotentialValue: "Valor potencial: •••",
    lockedClaimPath: "Ruta de reclamo: solo PRO",
    lockedSignalHint: "Se detectaron señales avanzadas de elegibilidad",
    unlockingRoutes: "Desbloqueando rutas avanzadas...",
    potentialTitle: "Oportunidades potenciales de airdrop",
    claimableTitle: "Airdrops reclamables detectados",
    unlockContact: "Contactar soporte para desbloquear acceso completo a airdrop",
    exactPayHint: "Por favor, pague exactamente la cantidad mostrada, de lo contrario el sistema puede no reconocer el pago",
  },

  it: {
    title: "VOIDPULSE",
    subtitle: "Airdrop Intelligence Terminal",
    walletLabel: "Indirizzo wallet",
    placeholder: "Inserisci un indirizzo 0x",
    queryBtn: "Cerca airdrop",
    loading: "Analisi attività del wallet in corso...",
    freeTip: "Usato {count}/3 oggi (Gratis)",
    memberActive: "PRO attivo",
    expiry: "Scade",
    upgradeTitle: "Attiva PRO",
    monthly: "Piano mensile",
    yearly: "Piano annuale",
    monthlyPrice: "4.99 USDT / mese",
    yearlyPrice: "39.99 USDT / anno",
    save: "Risparmia 33%",
    hotAirdrops: "Airdrop caldi",
    quantity: "Quantità",
    value: "Valore",
    claimable: "Riscattabile",
    upcoming: "In arrivo",
    invalidAddress: "Inserisci un indirizzo valido (0x..., 42 caratteri)",
    limitReached: "La versione gratuita consente 3 controlli al giorno.",
    resultTitle: "Pannello opportunità",
    walletChecked: "Wallet controllata",
    score: "Punteggio",
    estimatedValue: "Valore stimato",
    projects: "Progetti associati",
    recentCheck: "Controllo recente",
    premiumTitle: "Sblocca più opportunità",
    premiumItem1: "Controlli giornalieri illimitati",
    premiumItem2: "Tracciamento multi-chain",
    premiumItem3: "Avvisi più rapidi",
    premiumItem4: "Analisi wallet di alto valore",
    choosePlan: "Scegli il tuo piano",
    claimStatus: "Stato",
    claimGuide: "Come riscattare",
    gasToken: "Gas richiesto",
    claimNetwork: "Rete",
    officialClaim: "Claim ufficiale",
    monitorOnly: "Monitora annuncio ufficiale",
    autoAirdrop: "Distribuzione automatica",
    manualClaim: "Claim manuale",
    predictedOnly: "Idoneità prevista",
    step1: "Connetti la wallet sulla rete corretta",
    step2: "Controlla l'idoneità",
    step3: "Prepara il token gas richiesto",
    step4: "Apri la pagina ufficiale e clicca Claim",
    step5: "Torna alla wallet e controlla gli asset",
    noLiveClaim: "Il claim non è ancora attivo.",
    officialHint: "Usa solo link ufficiali.",
    riskTitle: "Avviso di sicurezza",
    risk1: "⚠ Non condividere mai chiave privata o seed",
    risk2: "⚠ Verifica sempre il dominio ufficiale",
    risk3: "⚠ Non firmare approvazioni che non capisci",
    verifiedDomain: "Dominio verificato",
    communitySource: "Fonte community",
    unknownSource: "Fonte sconosciuta",
    deadline: "Scadenza",
    sourceType: "Fonte",
    officialSite: "Sito ufficiale",
    payTitle: "Pagamento",
    paySubtitle: "Pagamento on-chain e attivazione istantanea",
    payAmount: "Importo",
    payAddress: "Indirizzo",
    payNetwork: "Rete",
    payToken: "Token",
    payOrder: "Ordine",
    payCopy: "Copia indirizzo",
    payBack: "Indietro",
    payWaiting: "Creazione ordine...",
    payReady: "Pronto al pagamento",
    payPaid: "Pagato, ritorno...",
    highValueDetected: "Rilevata opportunità potenziale di alto valore",
    riskNotice: "⚠ Alcune opportunità potrebbero scadere presto",
    paymentTrust1: "✔ Pagamento on-chain su Polygon",
    paymentTrust2: "✔ Nessuna approvazione, solo trasferimento USDT",
    paymentTrust3: "✔ Attivazione automatica dopo il pagamento",
    walletHint: "Usa una wallet compatibile con Polygon",
    riskTransfer: "⚠ Non inviare sulla rete sbagliata",
    redirecting: "Reindirizzamento",
    unlockTitle: "Sblocca il pannello completo",
    unlockSub: "Attiva ora per vedere più segnali e accessi claim",
    cancel: "Annulla",
    paidAlready: "Questa sessione ha già PRO attivo",
    backHome: "Torna alla home",
    backToScanner: "Torna allo scanner",
    claimNow: "Richiedi ora",
    inspectMore: "Apri sito",
    scanAgain: "Nuova scansione",
    realSignals: "Query reale + stima locale",
    planMonthlyHint: "Ideale per test brevi",
    planYearlyHint: "Ideale per monitoraggio lungo",
    paymentCheckFailed: "Controllo membership fallito",
    createOrderFailed: "Creazione ordine fallita",
    noResultTitle: "Nessun risultato",
    lockedRouteTitle: "Percorso PRO nascosto",
    lockedRouteDesc: "Ci sono altre {count} opportunità abbinate nascoste",
    lockedPotentialValue: "Valore potenziale: •••",
    lockedClaimPath: "Percorso claim: solo PRO",
    lockedSignalHint: "Rilevati segnali avanzati di idoneità",
    unlockingRoutes: "Sblocco dei percorsi avanzati...",
    potentialTitle: "Potenziali opportunità di airdrop",
    claimableTitle: "Airdrop riscattabili rilevati",
    unlockContact: "Contatta il supporto per sbloccare l'accesso completo agli airdrop",
    exactPayHint: "Si prega di pagare esattamente l'importo indicato, altrimenti il sistema potrebbe non riconoscere il pagamento",
  },

  kr: {
    title: "VOIDPULSE",
    subtitle: "Airdrop Intelligence Terminal",
    walletLabel: "지갑 주소",
    placeholder: "0x 지갑 주소를 입력하세요",
    queryBtn: "에어드롭 검색",
    loading: "지갑 활동을 스캔하는 중...",
    freeTip: "오늘 {count}/3회 사용됨 (무료)",
    memberActive: "PRO 활성화됨",
    expiry: "만료",
    upgradeTitle: "PRO 활성화",
    monthly: "월간 플랜",
    yearly: "연간 플랜",
    monthlyPrice: "4.99 USDT / 월",
    yearlyPrice: "39.99 USDT / 년",
    save: "33% 절약",
    hotAirdrops: "인기 에어드롭",
    quantity: "수량",
    value: "가치",
    claimable: "청구 가능",
    upcoming: "곧 공개",
    invalidAddress: "올바른 지갑 주소를 입력하세요 (0x..., 42자)",
    limitReached: "무료 버전은 하루 3회 조회 가능합니다.",
    resultTitle: "기회 패널",
    walletChecked: "조회한 주소",
    score: "점수",
    estimatedValue: "예상 가치",
    projects: "매칭 프로젝트",
    recentCheck: "최근 조회",
    premiumTitle: "더 많은 기회 잠금 해제",
    premiumItem1: "무제한 일일 조회",
    premiumItem2: "멀티체인 추적",
    premiumItem3: "더 빠른 알림",
    premiumItem4: "고가치 주소 분석",
    choosePlan: "플랜 선택",
    claimStatus: "상태",
    claimGuide: "청구 방법",
    gasToken: "필요 가스",
    claimNetwork: "네트워크",
    officialClaim: "공식 청구",
    monitorOnly: "공식 공지 확인",
    autoAirdrop: "자동 지급",
    manualClaim: "수동 청구",
    predictedOnly: "예상 자격",
    step1: "올바른 체인으로 지갑 연결",
    step2: "자격 여부 확인",
    step3: "필요한 가스 토큰 준비",
    step4: "공식 페이지에서 Claim 클릭",
    step5: "지갑으로 돌아가 자산 확인",
    noLiveClaim: "아직 청구가 시작되지 않았습니다.",
    officialHint: "반드시 공식 링크만 사용하세요.",
    riskTitle: "보안 안내",
    risk1: "⚠ 개인키나 시드 문구를 절대 공유하지 마세요",
    risk2: "⚠ 반드시 공식 도메인을 확인하세요",
    risk3: "⚠ 이해하지 못하는 승인에 서명하지 마세요",
    verifiedDomain: "검증된 출처",
    communitySource: "커뮤니티 출처",
    unknownSource: "알 수 없는 출처",
    deadline: "마감 시간",
    sourceType: "출처",
    officialSite: "공식 사이트",
    payTitle: "결제",
    paySubtitle: "온체인 결제 및 즉시 활성화",
    payAmount: "금액",
    payAddress: "주소",
    payNetwork: "네트워크",
    payToken: "토큰",
    payOrder: "주문 번호",
    payCopy: "주소 복사",
    payBack: "뒤로",
    payWaiting: "주문 생성 중...",
    payReady: "결제 준비 완료",
    payPaid: "결제 완료, 돌아가는 중...",
    highValueDetected: "잠재적 고가치 에어드롭 기회 감지",
    riskNotice: "⚠ 일부 기회는 곧 만료될 수 있습니다",
    paymentTrust1: "✔ Polygon 온체인 결제",
    paymentTrust2: "✔ 승인 필요 없음, USDT 전송만",
    paymentTrust3: "✔ 결제 후 자동 활성화",
    walletHint: "Polygon 지원 지갑으로 스캔 후 결제하세요",
    riskTransfer: "⚠ 잘못된 네트워크로 보내지 마세요",
    redirecting: "이동 중",
    unlockTitle: "전체 패널 잠금 해제",
    unlockSub: "지금 활성화해서 더 많은 신호와 클레임 입구 확인",
    unlockContact:"에어드롭 전체 접근을 열려면 고객센터에 문의하세요",
    cancel: "취소",
    paidAlready: "이 세션은 이미 PRO 활성화 상태입니다",
    backHome: "홈으로 돌아가기",
    backToScanner: "스캐너로 돌아가기",
    claimNow: "지금 청구",
    inspectMore: "사이트 열기",
    scanAgain: "다시 검색",
    realSignals: "실제 조회 + 로컬 추정",
    planMonthlyHint: "단기 테스트용",
    planYearlyHint: "장기 추적용",
    paymentCheckFailed: "회원 상태 확인 실패",
    createOrderFailed: "주문 생성 실패",
    noResultTitle: "결과 없음",
    lockedRouteTitle: "숨겨진 PRO 경로",
    lockedRouteDesc: "추가로 {count}개의 매칭 기회가 숨겨져 있습니다",
    lockedPotentialValue: "잠재 가치: •••",
    lockedClaimPath: "청구 경로: PRO 전용",
    lockedSignalHint: "고급 자격 신호가 감지되었습니다",
    unlockingRoutes: "고급 경로를 잠금 해제하는 중...",
    potentialTitle: "잠재적 에어드롭 기회",
    claimableTitle: "청구 가능한 에어드롭 감지",
    exactPayHint: "표시된 금액을 정확히 결제해주세요. 그렇지 않으면 시스템이 결제를 인식하지 못할 수 있습니다",
  },

  ru: {
    title: "VOIDPULSE",
    subtitle: "Терминал аналитики аирдропов",
    walletLabel: "Адрес кошелька",
    placeholder: "Введите адрес кошелька 0x",
    queryBtn: "Проверить аирдропы",
    loading: "Сканирование активности кошелька...",
    freeTip: "Использовано {count}/3 сегодня (Бесплатно)",
    memberActive: "PRO доступ активирован",
    expiry: "Истекает",
    upgradeTitle: "Активировать PRO",
    monthly: "Месячный план",
    yearly: "Годовой план",
    monthlyPrice: "4.99 USDT / месяц",
    yearlyPrice: "39.99 USDT / год",
    save: "Экономия 33%",
    hotAirdrops: "Горячие аирдропы",
    quantity: "Количество",
    value: "Стоимость",
    claimable: "Можно получить",
    upcoming: "Скоро",
    invalidAddress: "Введите корректный адрес кошелька (0x..., 42 символа)",
    limitReached: "Бесплатный тариф позволяет 3 проверки в день. Обновитесь до PRO.",
    resultTitle: "Панель возможностей",
    walletChecked: "Проверенный кошелёк",
    score: "Оценка",
    estimatedValue: "Примерная стоимость",
    projects: "Подходящие проекты",
    recentCheck: "Последняя проверка",
    premiumTitle: "Откройте больше возможностей",
    premiumItem1: "Безлимитные ежедневные проверки",
    premiumItem2: "Отслеживание мультичейн кошельков",
    premiumItem3: "Более ранние сигналы по горячим аирдропам",
    premiumItem4: "Анализ кошельков высокой ценности",
    choosePlan: "Выберите тариф",
    claimStatus: "Статус получения",
    claimGuide: "Как получить",
    gasToken: "Нужный Gas",
    claimNetwork: "Сеть получения",
    officialClaim: "Официальное получение",
    monitorOnly: "Следить за официальным анонсом",
    autoAirdrop: "Автоматическое начисление",
    manualClaim: "Ручное получение",
    predictedOnly: "Предполагаемое право",
    step1: "Подключите кошелёк в правильной сети",
    step2: "Проверьте, подходит ли адрес",
    step3: "Подготовьте нужный gas token",
    step4: "Откройте официальную страницу и нажмите Claim",
    step5: "Вернитесь в кошелёк и проверьте активы",
    noLiveClaim: "Получение ещё не открыто. Следите за официальным анонсом.",
    officialHint:
      "Используйте только официальные ссылки. Не переходите по неизвестным ссылкам из чатов и личных сообщений.",
    riskTitle: "Уведомление о безопасности",
    risk1: "⚠ Никогда не раскрывайте приватный ключ или seed-фразу",
    risk2: "⚠ Всегда проверяйте официальный домен перед получением",
    risk3: "⚠ Не подписывайте разрешения, которые не понимаете",
    verifiedDomain: "Проверенный источник",
    communitySource: "Источник сообщества",
    unknownSource: "Неизвестный источник",
    deadline: "Срок",
    sourceType: "Источник",
    officialSite: "Официальный сайт",
    payTitle: "Оплата",
    paySubtitle: "Ончейн-оплата и мгновенная активация подписки",
    payAmount: "Сумма",
    payAddress: "Адрес",
    payNetwork: "Сеть",
    payToken: "Токен",
    payOrder: "ID заказа",
    payCopy: "Скопировать адрес",
    payBack: "Назад",
    payWaiting: "Создание заказа...",
    payReady: "Готово к оплате",
    payPaid: "Оплачено, возврат...",
    highValueDetected: "Обнаружена потенциально ценная возможность аирдропа",
    riskNotice: "⚠ Некоторые аирдропы могут скоро истечь",
    paymentTrust1: "✔ Ончейн-оплата в Polygon",
    paymentTrust2: "✔ Без approve, только перевод USDT",
    paymentTrust3: "✔ PRO активируется автоматически после оплаты",
    walletHint: "Используйте кошелёк с поддержкой Polygon для сканирования и оплаты",
    riskTransfer: "⚠ Не отправляйте в неправильную сеть",
    redirecting: "Переход",
    unlockTitle: "Открыть полную платную панель",
    unlockSub: "Активируйте сейчас, чтобы увидеть больше совпадений и входов для получения",
    cancel: "Отмена",
    paidAlready: "Для этой сессии PRO уже активирован",
    backHome: "На главную",
    backToScanner: "Назад к сканеру",
    claimNow: "Получить сейчас",
    inspectMore: "Открыть сайт",
    scanAgain: "Проверить снова",
    realSignals: "Живой запрос + локальная оценка",
    planMonthlyHint: "Лучше для краткосрочного теста",
    planYearlyHint: "Лучше для долгосрочного отслеживания",
    paymentCheckFailed: "Не удалось проверить статус подписки",
    createOrderFailed: "Не удалось создать заказ",
    noResultTitle: "Пока нет результатов",
    lockedRouteTitle: "Скрытый PRO маршрут",
    lockedRouteDesc: "Скрыто ещё {count} дополнительных совпадений",
    lockedPotentialValue: "Потенциальная стоимость: •••",
    lockedClaimPath: "Путь получения: только PRO",
    lockedSignalHint: "Обнаружены продвинутые сигналы соответствия",
    unlockingRoutes: "Открываем продвинутые маршруты...",
    potentialTitle: "Потенциальные возможности аирдропа",
    claimableTitle: "Обнаружены доступные аирдропы",
    unlockContact: "Свяжитесь с поддержкой, чтобы открыть полный доступ к аирдропам",
    exactPayHint: "Пожалуйста, оплатите точную указанную сумму, иначе система может не распознать платеж",
  },
};

const languages = [
  { code: "gb", label: "English", flag: "🇬🇧", short: "GB" },
  { code: "hk", label: "繁體中文", flag: "🇭🇰", short: "HK" },
  { code: "ru", label: "Русский", flag: "🇷🇺", short: "RU" },
  { code: "jp", label: "日本語", flag: "🇯🇵", short: "JP" },
  { code: "es", label: "Español", flag: "🇪🇸", short: "ES" },
  { code: "it", label: "Italiano", flag: "🇮🇹", short: "IT" },
  { code: "kr", label: "한국어", flag: "🇰🇷", short: "KR" },
];

/* ===================== data ===================== */
const projectCatalog = [
  {
    name: "LayerZero",
    token: "ZRO",
    value: "$180 - $420",
    network: "Ethereum",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: true,
    deadline: "2026-04-15 23:59 UTC",
    officialUrl: "https://layerzero.foundation",
    sourceType: "verified",
  },
  {
    name: "StarkNet",
    token: "STRK",
    value: "$300 - $900",
    network: "Ethereum",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: true,
    deadline: "2026-05-01 23:59 UTC",
    officialUrl: "https://starknet.io",
    sourceType: "verified",
  },
  {
    name: "ZkSync",
    token: "ZKS",
    value: "$100 - $350",
    network: "zkSync Era",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: false,
    deadline: "TBA",
    officialUrl: "https://zksync.io",
    sourceType: "community",
  },
  {
    name: "Scroll",
    token: "SCR",
    value: "$80 - $260",
    network: "Scroll",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: false,
    deadline: "TBA",
    officialUrl: "https://scroll.io",
    sourceType: "verified",
  },
  {
    name: "Base Ecosystem",
    token: "BASE",
    value: "$60 - $220",
    network: "Base",
    gasToken: "ETH",
    claimType: "auto",
    claimLive: false,
    deadline: "Auto distribution",
    officialUrl: "https://base.org",
    sourceType: "verified",
  },
  {
    name: "Linea",
    token: "LINEA",
    value: "$90 - $280",
    network: "Linea",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: false,
    deadline: "TBA",
    officialUrl: "https://linea.build",
    sourceType: "community",
  },
  {
    name: "Blast",
    token: "BLAST",
    value: "$120 - $360",
    network: "Blast",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: true,
    deadline: "2026-04-28 23:59 UTC",
    officialUrl: "https://blast.io",
    sourceType: "verified",
  },
  {
    name: "Mode",
    token: "MODE",
    value: "$40 - $160",
    network: "Mode",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: false,
    deadline: "TBA",
    officialUrl: "https://mode.network",
    sourceType: "community",
  },
  {
    name: "Fuel",
    token: "FUEL",
    value: "$100 - $300",
    network: "Fuel",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: false,
    deadline: "TBA",
    officialUrl: "https://fuel.network",
    sourceType: "community",
  },
  {
    name: "EigenLayer",
    token: "EIGEN",
    value: "$180 - $520",
    network: "Ethereum",
    gasToken: "ETH",
    claimType: "manual",
    claimLive: true,
    deadline: "2026-05-20 23:59 UTC",
    officialUrl: "https://www.eigenlayer.xyz",
    sourceType: "verified",
  },
];

/* ===================== helpers ===================== */
function tFor(lang) {
  return translations[lang] || translations.gb;
}

function isValidEvmAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test((address || "").trim());
}

function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getTodayKey() {
  return new Date().toDateString();
}

function getStoredLang() {
  const browserLang = (navigator.language || "en").toLowerCase();
  const defaultLang = browserLang.includes("zh")
    ? "hk"
    : browserLang.includes("ru")
    ? "ru"
    : browserLang.includes("ja")
    ? "jp"
    : browserLang.includes("es")
    ? "es"
    : browserLang.includes("it")
    ? "it"
    : browserLang.includes("kr")
    ? "kr"
    : "gb";

  return localStorage.getItem("language") || defaultLang;
}

function getSourceBadge(sourceType, t) {
  if (sourceType === "verified") {
    return {
      text: t.verifiedDomain,
      color: "#d6b3c9",
      bg: "rgba(0, 229, 255, 0.10)",
      border: "rgba(0, 229, 255, 0.30)",
    };
  }
  if (sourceType === "community") {
    return {
      text: t.communitySource,
      color: "#ffc980",
      bg: "rgba(240,185,11,0.10)",
      border: "rgba(240,185,11,0.28)",
    };
  }
  return {
    text: t.unknownSource,
    color: "#b6becd",
    bg: "rgba(132,142,156,0.10)",
    border: "rgba(132,142,156,0.28)",
  };
}

function normalizeProjects(projectNames = []) {
  return projectNames.map((name) => {
    const found = projectCatalog.find(
      (p) => p.name.toLowerCase() === String(name).toLowerCase()
    );

    if (found) return found;

    return {
  name,
  token: "TBA",
  value: "",
  estimatedValue: "Potential $50-$200",
  network: "Multiple",
  gasToken: "-",
  claimType: "predicted",
  claimLive: false,
  deadline: "TBA",
  officialUrl: "",
  sourceType: "unknown",
};
  });
}

function enrichProjects(projects = [], score = 0) {
  const existingNames = new Set(projects.map((p) => p.name.toLowerCase()));
  const enriched = [...projects];

const addCandidates = projectCatalog
  .filter((p) => !existingNames.has(p.name.toLowerCase()))
  .sort((a, b) => {
    const getMax = (v) => {
      const m = String(v).match(/\$(\d+)\s*-\s*\$(\d+)/);
      return m ? parseInt(m[2], 10) : 0;
    };
    return getMax(b.value) - getMax(a.value);
  });

const addCount = score >= 90 ? 4 : score >= 75 ? 3 : score >= 55 ? 2 : 1;

for (
  let i = 0;
  i < addCandidates.length && enriched.length < projects.length + addCount;
  i += 1
) {
  enriched.push({ ...addCandidates[i] });
}

  return enriched;
}

function getClaimLabel(result, t) {
  if (!result.found) return t.predictedOnly;
  if (result.claimType === "auto") return t.autoAirdrop;
  if (result.claimLive) return t.manualClaim;
  return t.monitorOnly;
}

async function fetchJsonSafe(url, options) {
  let res;

  try {
    res = await fetch(url, options);
  } catch (err) {
    throw new Error(`Cannot connect to backend: ${url}`);
  }

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || `Request failed: ${res.status}`);
  }

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Invalid JSON from ${url}`);
  }
}

function delayedNavigate(url, delay = NAV_DELAY) {
  window.setTimeout(() => {
    window.open(url, "_blank");
  }, delay);
}

function delayedOpen(url, delay = NAV_DELAY) {
  window.setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, delay);
}

function createSoundwaveEffect(el, event) {
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const fallbackX = rect.width / 2;
  const fallbackY = rect.height / 2;

  const x =
    typeof event?.clientX === "number" ? event.clientX - rect.left : fallbackX;
  const y =
    typeof event?.clientY === "number" ? event.clientY - rect.top : fallbackY;

  const oldFx = el.querySelectorAll(".soundwave-burst");
  oldFx.forEach((node) => node.remove());

  const burst = document.createElement("span");
  burst.className = "soundwave-burst";
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;

  const bars = 17;
  for (let i = 0; i < bars; i += 1) {
    const bar = document.createElement("span");
    const angle = (i / bars) * Math.PI * 2;
    const height = 16 + Math.random() * 22;

    bar.className = "soundwave-bar";
    bar.style.setProperty("--angle", `${angle}rad`);
    bar.style.setProperty("--bar-height", `${height}px`);
    bar.style.setProperty("--delay", `${i * 0.018}s`);

    burst.appendChild(bar);
  }

  el.appendChild(burst);
  el.classList.add("is-glowing-white");

  window.setTimeout(() => {
    burst.remove();
    el.classList.remove("is-glowing-white");
  }, 760);
}

/* ===================== global styles ===================== */
function useGlobalStyles() {
  useEffect(() => {
    const styleId = "voidpulse-global-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; min-height: 100%; background: #07090d; }
  body {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #eef2f6;
  }

  @keyframes payHintPulse {
    0% {
      opacity: 1;
      text-shadow: 0 0 0px rgba(255,77,79,0);
    }
    50% {
      opacity: 0.6;
      text-shadow: 0 0 8px rgba(255,77,79,0.6);
    }
    100% {
      opacity: 1;
      text-shadow: 0 0 0px rgba(255,77,79,0);
    }
  }

      .pulse-btn {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        isolation: isolate;
        transition:
          transform 0.16s ease,
          box-shadow 0.22s ease,
          filter 0.22s ease,
          border-color 0.22s ease,
          background 0.22s ease;
        background:
          linear-gradient(180deg, rgba(31,22,31,0.94), rgba(18,13,20,0.96));
        box-shadow:
          inset 0 1px 0 rgba(255,247,252,0.07),
          inset 0 -1px 0 rgba(33,20,30,0.78),
          0 0 0 1px rgba(214,151,192,0.14),
          0 10px 24px rgba(0,0,0,0.28);
      }

      .pulse-btn:hover {
        filter: brightness(1.03);
        transform: translateY(-1px);
      }

      .bear-pixel-btn {
        clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px);
      }

      .bear-pixel-btn::before,
      .bear-pixel-btn::after {
        content: "";
        position: absolute;
        top: -6px;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background: rgba(210,149,190,0.92);
        box-shadow:
          0 0 0 1px rgba(255,227,242,0.08),
          0 0 12px rgba(210,149,190,0.24);
        opacity: 0.94;
        z-index: 2;
      }

      .bear-pixel-btn::before { left: 16px; }
      .bear-pixel-btn::after { right: 16px; }

      .pulse-btn.is-glowing-white,
      .pulse-btn:active {
        box-shadow:
          inset 0 1px 0 rgba(255,247,252,0.10),
          inset 0 -1px 0 rgba(33,20,30,0.86),
          0 0 0 1px rgba(255,233,244,0.16),
          0 0 16px rgba(238,181,218,0.18),
          0 0 34px rgba(184,122,161,0.12),
          0 12px 28px rgba(0,0,0,0.32);
        filter: brightness(1.07) saturate(1.02);
      }

      @keyframes pixelBlinkFast {
        0% { opacity: 0.32; }
        18% { opacity: 0.95; }
        37% { opacity: 0.42; }
        52% { opacity: 1; }
        71% { opacity: 0.38; }
        100% { opacity: 0.88; }
      }

      @keyframes pixelTravelFast {
        0% { transform: translateX(-18%) translateY(0); opacity: 0; }
        12% { opacity: 0.72; }
        40% { opacity: 1; }
        100% { transform: translateX(18%) translateY(0); opacity: 0; }
      }

      @keyframes panelPixelFlow {
        0% { transform: translate3d(-8px, 0, 0); opacity: 0.22; }
        25% { transform: translate3d(6px, -2px, 0); opacity: 0.56; }
        50% { transform: translate3d(-3px, 2px, 0); opacity: 0.3; }
        75% { transform: translate3d(8px, -1px, 0); opacity: 0.62; }
        100% { transform: translate3d(-8px, 0, 0); opacity: 0.22; }
      }

      .pixel-bear-panel {
        position: relative;
        height: 176px;
        margin: 8px 0 14px;
        border-radius: 0;
        overflow: hidden;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.008)),
          radial-gradient(circle at 50% 68%, rgba(255,122,203,0.06), rgba(255,122,203,0.018) 34%, rgba(0,0,0,0) 68%);
        border: 1px solid rgba(232,137,198,0.12);
        box-shadow:
          inset 0 0 0 1px rgba(255,255,255,0.025),
          0 10px 28px rgba(0,0,0,0.34);
      }

      .pixel-bear-panel::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
        background-size: 12px 12px;
        opacity: 0.22;
        pointer-events: none;
      }

      .pixel-bear-panel::after {
        content: "";
        position: absolute;
        inset: auto 0 0 0;
        height: 38%;
        pointer-events: none;
        background:
          radial-gradient(circle at 18% 82%, rgba(255,196,231,0.14), transparent 0 22%),
          radial-gradient(circle at 42% 76%, rgba(255,168,220,0.12), transparent 0 20%),
          radial-gradient(circle at 68% 84%, rgba(255,196,231,0.12), transparent 0 20%),
          radial-gradient(circle at 84% 78%, rgba(255,168,220,0.14), transparent 0 22%);
        opacity: 0.55;
        filter: blur(0.4px);
      }

      .pixel-bear-svg {
        position: absolute;
        inset: 7px;
        width: calc(100% - 14px);
        height: calc(100% - 14px);
        image-rendering: pixelated;
        shape-rendering: crispEdges;
      }

      .rabbit-float-a,
      .rabbit-float-b {
        transform-box: fill-box;
        transform-origin: center;
        will-change: transform;
      }

      .rabbit-float-a {
        animation: rabbitFloatA 3.8s ease-in-out infinite;
      }

      .rabbit-float-b {
        animation: rabbitFloatB 4.6s ease-in-out infinite;
        animation-delay: 0.8s;
      }

      .rabbit-outline {
        fill: none;
        stroke: rgba(255,240,248,0.92);
        stroke-width: 0.65;
        vector-effect: non-scaling-stroke;
      }

      .rabbit-outline.twinkle-a { animation: rabbitTwinkleA 4.6s steps(2, end) infinite; }
      .rabbit-outline.twinkle-b { animation: rabbitTwinkleB 5.4s steps(2, end) infinite; }
      .rabbit-outline.twinkle-c { animation: rabbitTwinkleC 6.1s steps(2, end) infinite; }

      .rabbit-solid {
        fill: rgba(255,138,210,0.96);
        animation: rabbitSolidPulse 7.8s ease-in-out infinite;
      }

      .rabbit-solid.soft { fill: rgba(246,190,228,0.72); }
      .rabbit-solid.hot { fill: rgba(255,168,225,1); }
      .rabbit-solid.blue { fill: rgba(120,200,255,0.92); }
      .rabbit-solid.blue.soft { fill: rgba(170,225,255,0.70); }
      .rabbit-solid.blue.hot { fill: rgba(140,215,255,1); }
      .rabbit-stripe {
        fill: rgba(255,236,246,0.055);
        stroke: rgba(255,236,246,0.42);
        stroke-width: 0.62;
        vector-effect: non-scaling-stroke;
      }

      .rabbit-spark {
        fill: rgba(255,238,248,0.9);
        animation: rabbitSpark 5.6s ease-in-out infinite;
      }

      @keyframes rabbitFloatA {
  0% {
    transform: translate(0px, 0px);
  }
  30% {
    transform: translate(calc(0.5px + 0.5px * var(--rand)), calc(-2px - 1px * var(--rand)));
  }
  55% {
    transform: translate(calc(0.5px + 0.5px * var(--rand)), calc(-2px - 1px * var(--rand)));
  }
  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes rabbitFloatB {
  0% {
    transform: translate(0px, 0px);
  }
  35% {
    transform: translate(calc(-0.5px - 0.5px * var(--rand2)), calc(-1.5px - 1px * var(--rand2)));
  }
  65% {
    transform: translate(calc(-0.5px - 0.5px * var(--rand2)), calc(-1.5px - 1px * var(--rand2)));
  }
  100% {
    transform: translate(0px, 0px);
  }
}

      @keyframes rabbitTwinkleA {
        0%, 100% { opacity: 0.2; }
        24% { opacity: 0.34; }
        42% { opacity: 0.58; }
        55% { opacity: 0.28; }
        78% { opacity: 0.46; }
      }

      @keyframes rabbitTwinkleB {
        0%, 100% { opacity: 0.16; }
        18% { opacity: 0.28; }
        49% { opacity: 0.52; }
        66% { opacity: 0.22; }
        86% { opacity: 0.42; }
      }

      @keyframes rabbitTwinkleC {
        0%, 100% { opacity: 0.14; }
        22% { opacity: 0.24; }
        44% { opacity: 0.36; }
        63% { opacity: 0.2; }
        82% { opacity: 0.48; }
      }

      @keyframes rabbitSolidPulse {
        0%, 100% { opacity: 0.58; }
        36% { opacity: 0.82; }
        62% { opacity: 0.66; }
      }

      @keyframes rabbitSpark {
        0%, 100% { opacity: 0.06; }
        35% { opacity: 0.22; }
        58% { opacity: 0.48; }
        70% { opacity: 0.16; }
      }

      .pixel-circuit-btn {
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }

      .pixel-circuit-btn::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: 0.96;
        background-image:
          linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px),
          linear-gradient(115deg, transparent 0 18%, rgba(255,199,228,0.18) 18% 19%, transparent 19% 34%, rgba(255,199,228,0.12) 34% 35%, transparent 35% 100%),
          linear-gradient(65deg, transparent 0 48%, rgba(255,216,238,0.12) 48% 49%, transparent 49% 64%, rgba(255,216,238,0.18) 64% 65%, transparent 65% 100%),
          radial-gradient(circle at 12% 52%, rgba(255,198,229,0.16) 0 1.15px, transparent 1.95px),
          radial-gradient(circle at 28% 36%, rgba(255,198,229,0.12) 0 1.05px, transparent 1.85px),
          radial-gradient(circle at 46% 66%, rgba(255,198,229,0.17) 0 1.15px, transparent 2px),
          radial-gradient(circle at 61% 44%, rgba(255,198,229,0.14) 0 1.05px, transparent 1.9px),
          radial-gradient(circle at 79% 58%, rgba(255,198,229,0.16) 0 1.15px, transparent 1.95px),
          radial-gradient(circle at 90% 34%, rgba(255,198,229,0.13) 0 1.05px, transparent 1.85px);
        background-size:
          10px 10px,
          10px 10px,
          230% 100%,
          210% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%;
        background-position:
          0 0,
          0 0,
          -160% 0,
          140% 0,
          0 0,
          0 0,
          0 0,
          0 0,
          0 0,
          0 0;
        background-repeat: repeat, repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
        mix-blend-mode: screen;
        animation:
          pixelButtonStars 5.4s ease-in-out infinite,
          pixelButtonCircuit 3.4s linear infinite;
      }

      .pixel-circuit-btn::after {
        content: "";
        position: absolute;
        inset: -1px;
        pointer-events: none;
        z-index: 1;
        background:
          linear-gradient(104deg, transparent 0%, rgba(255,222,240,0.00) 20%, rgba(255,222,240,0.05) 29%, rgba(255,222,240,0.36) 39%, rgba(255,222,240,0.09) 48%, rgba(255,222,240,0.00) 58%, transparent 100%),
          radial-gradient(circle at var(--press-x, 50%) var(--press-y, 50%), rgba(255,222,240,0) 0 6%, rgba(255,222,240,0.42) 8%, rgba(255,222,240,0.08) 16%, transparent 28%);
        transform: translateX(-135%) skewX(-12deg);
        opacity: 0.72;
        animation: pixelButtonSweep 4.8s ease-in-out infinite;
      }

      .pixel-circuit-btn:hover::before,
      .pixel-circuit-btn.is-plan-hovered::before {
        opacity: 1;
        background-size:
          8px 8px,
          8px 8px,
          200% 100%,
          180% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%;
        animation-duration: 4.2s, 2.2s;
        filter: saturate(1.10) brightness(1.05);
      }

      .pixel-circuit-btn:hover::after {
        opacity: 0.92;
        animation-duration: 2.7s;
      }

      .pixel-circuit-btn.is-plan-hovered::after {
        opacity: 1;
        transform: translateX(0) skewX(-12deg);
        animation: pixelButtonPressFlash 0.38s cubic-bezier(.22,.61,.36,1) forwards;
      }

      @keyframes pixelButtonStars {
        0%, 100% { opacity: 0.42; filter: brightness(0.98); }
        18% { opacity: 0.58; filter: brightness(1.06); }
        39% { opacity: 0.48; filter: brightness(1); }
        61% { opacity: 0.72; filter: brightness(1.11); }
        83% { opacity: 0.54; filter: brightness(1.02); }
      }

      @keyframes pixelButtonCircuit {
        0% {
          background-position:
            0 0,
            0 0,
            -160% 0,
            140% 0,
            0 0,
            0 0,
            0 0,
            0 0,
            0 0,
            0 0;
        }
        100% {
          background-position:
            0 0,
            0 0,
            160% 0,
            -140% 0,
            0 0,
            0 0,
            0 0,
            0 0,
            0 0,
            0 0;
        }
      }

      @keyframes pixelButtonSweep {
        0%, 18% {
          transform: translateX(-140%) skewX(-14deg);
          opacity: 0;
        }
        34% {
          opacity: 0.70;
        }
        52% {
          transform: translateX(118%) skewX(-14deg);
          opacity: 1;
        }
        100% {
          transform: translateX(118%) skewX(-14deg);
          opacity: 0;
        }
      }

      @keyframes pixelButtonPressFlash {
        0% {
          opacity: 0.18;
          background:
            linear-gradient(104deg, transparent 0%, rgba(255,232,244,0.00) 18%, rgba(255,232,244,0.10) 28%, rgba(255,232,244,0.42) 42%, rgba(255,232,244,0.10) 56%, rgba(255,232,244,0.00) 68%, transparent 100%),
            radial-gradient(circle at var(--press-x, 50%) var(--press-y, 50%), rgba(255,232,244,0) 0 2%, rgba(255,232,244,0.96) 7%, rgba(255,232,244,0.26) 16%, transparent 28%);
          box-shadow:
            inset 0 0 0 0 rgba(255,232,244,0.0),
            0 0 0 0 rgba(255,232,244,0.0);
        }
        46% {
          opacity: 1;
          background:
            linear-gradient(104deg, transparent 0%, rgba(255,232,244,0.00) 14%, rgba(255,232,244,0.12) 24%, rgba(255,232,244,0.52) 40%, rgba(255,232,244,0.12) 58%, rgba(255,232,244,0.00) 72%, transparent 100%),
            radial-gradient(circle at var(--press-x, 50%) var(--press-y, 50%), rgba(255,232,244,0) 0 5%, rgba(255,232,244,0.88) 10%, rgba(255,232,244,0.32) 22%, transparent 38%);
          box-shadow:
            inset 0 0 0 1px rgba(255,232,244,0.06),
            0 0 16px rgba(255,232,244,0.10);
        }
        100% {
          opacity: 0;
          background:
            linear-gradient(104deg, transparent 0%, rgba(255,232,244,0.00) 22%, rgba(255,232,244,0.00) 50%, rgba(255,232,244,0.00) 78%, transparent 100%),
            radial-gradient(circle at var(--press-x, 50%) var(--press-y, 50%), rgba(255,232,244,0) 0 16%, rgba(255,232,244,0.12) 26%, transparent 44%);
          box-shadow:
            inset 0 0 0 0 rgba(255,232,244,0.0),
            0 0 0 rgba(255,232,244,0.0);
        }
      }




      .pixel-circuit-btn .button-circuit-lines {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 2;
        border-radius: inherit;
        opacity: 0.84;
        mix-blend-mode: screen;
        background:
          linear-gradient(90deg,
            transparent 0 6%,
            rgba(255,215,237,0.26) 6% 6.7%,
            transparent 6.7% 17%,
            rgba(255,215,237,0.18) 17% 17.7%,
            transparent 17.7% 36%,
            rgba(255,215,237,0.14) 36% 36.7%,
            transparent 36.7% 100%
          ),
          linear-gradient(0deg,
            transparent 0 30%,
            rgba(255,215,237,0.14) 30% 31%,
            transparent 31% 60%,
            rgba(255,215,237,0.10) 60% 61%,
            transparent 61% 100%
          );
        animation: pixelButtonLines 2.6s linear infinite;
      }

      .pixel-circuit-btn:hover .button-circuit-lines,
      .pixel-circuit-btn.is-plan-hovered .button-circuit-lines {
        opacity: 1;
        filter: brightness(1.18);
        animation-duration: 1.35s;
      }

      @keyframes pixelButtonLines {
        0% {
          transform: translateX(-10px);
          opacity: 0.66;
        }
        50% {
          transform: translateX(10px);
          opacity: 1;
        }
        100% {
          transform: translateX(-10px);
          opacity: 0.66;
        }
      }




.rabbit-matrix-btn {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.13), rgba(255,255,255,0.04));
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.22),
    inset 0 -1px 0 rgba(0,0,0,0.30),
    0 8px 22px rgba(0,0,0,0.28),
    0 0 0 1px rgba(255,255,255,0.04);
  transition:
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    transform 0.18s ease,
    filter 0.25s ease,
    background 0.25s ease;
}

.rabbit-matrix-btn::before {
  content: "";
  position: absolute;
  inset: -10% -12%;
  pointer-events: none;
  opacity: 0.9;
  background:
    linear-gradient(
      104deg,
      transparent 0%,
      transparent 18%,
      rgba(255,255,255,0.00) 28%,
      rgba(255,255,255,0.05) 36%,
      rgba(255,255,255,0.18) 43%,
      rgba(255,255,255,0.48) 49%,
      rgba(255,255,255,0.16) 55%,
      rgba(255,255,255,0.00) 63%,
      transparent 74%,
      transparent 100%
    ),
    linear-gradient(
      104deg,
      transparent 0%,
      transparent 52%,
      rgba(255,255,255,0.00) 60%,
      rgba(255,248,252,0.08) 66%,
      rgba(255,248,252,0.24) 71%,
      rgba(255,248,252,0.08) 76%,
      rgba(255,255,255,0.00) 82%,
      transparent 100%
    );
  transform: translateX(-145%) skewX(-12deg);
  mix-blend-mode: screen;
  filter: blur(0.6px);
  animation: rabbitCurrentFlow 2.2s linear infinite;
}

.rabbit-matrix-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.42;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.00) 28%, rgba(255,255,255,0.00) 72%, rgba(255,255,255,0.10));
}

.pulse-btn:hover {
  filter: brightness(1.08) saturate(1.03);
}

.rabbit-matrix-btn:hover {
  border-color: rgba(255,255,255,0.25);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.30),
    inset 0 -1px 0 rgba(0,0,0,0.34),
    0 12px 30px rgba(0,0,0,0.30),
    0 0 18px rgba(255,240,250,0.08);
}

.rabbit-matrix-btn:hover::before,
.rabbit-matrix-btn.is-plan-hovered::before {
  animation-duration: 1.15s;
  opacity: 1;
  filter: blur(0.3px) brightness(1.12);
}

.pulse-btn.is-glowing-white,
.pulse-btn:active {
  box-shadow:
    inset 0 1px 0 rgba(255,240,247,0.22),
    inset 0 -1px 0 rgba(25,14,22,0.44),
    0 0 0 1px rgba(239,184,219,0.18),
    0 0 14px rgba(239,184,219,0.12),
    0 14px 28px rgba(0,0,0,0.28);
  filter: brightness(1.09) saturate(1.04);
}

@keyframes rabbitCurrentFlow {
  0% {
    transform: translateX(-145%) skewX(-12deg);
    opacity: 0.18;
  }
  12% {
    opacity: 0.9;
  }
  45% {
    opacity: 1;
  }
  100% {
    transform: translateX(145%) skewX(-12deg);
    opacity: 0.22;
  }
}

.soundwave-burst {
        position: absolute;
        width: 0;
        height: 0;
        pointer-events: none;
        z-index: 3;
      }

      .soundwave-bar {
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: var(--bar-height);
        margin-left: -1.5px;
        margin-top: calc(var(--bar-height) / -2);
        border-radius: 999px;
        background: linear-gradient(
          180deg,
          rgba(255,255,255,0.98) 0%,
          rgba(255,255,255,0.68) 48%,
          rgba(255,255,255,0.06) 100%
        );
        box-shadow:
          0 0 8px rgba(255,255,255,0.78),
          0 0 18px rgba(255,255,255,0.22);
        transform: rotate(var(--angle)) translateX(0) scaleY(0.15);
        transform-origin: center center;
        opacity: 0;
        animation: vpSoundwaveBar 0.62s ease-out forwards;
        animation-delay: var(--delay);
      }

      @keyframes vpSoundwaveBar {
        0% {
          transform: rotate(var(--angle)) translateX(0) scaleY(0.15);
          opacity: 0;
        }
        24% {
          transform: rotate(var(--angle)) translateX(10px) scaleY(1);
          opacity: 1;
        }
        100% {
          transform: rotate(var(--angle)) translateX(42px) scaleY(0.35);
          opacity: 0;
        }
      }

      .vp-face {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .vp-face::before {
        content: "";
        position: absolute;
        right: -2%;
        top: 4%;
        width: min(54vw, 620px);
        height: min(82vh, 820px);
        opacity: 0.22;
        filter: blur(1.5px) saturate(0.78);
        background:
          url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 620 760'><defs><filter id='g'><feGaussianBlur stdDeviation='2.4'/></filter></defs><g opacity='0.96'><rect x='202' y='102' width='54' height='54' rx='10' fill='rgba(214,143,186,0.72)'/><rect x='364' y='102' width='54' height='54' rx='10' fill='rgba(214,143,186,0.72)'/><rect x='160' y='162' width='60' height='60' rx='12' fill='rgba(198,127,170,0.70)'/><rect x='222' y='162' width='60' height='60' rx='12' fill='rgba(214,143,186,0.82)'/><rect x='284' y='162' width='60' height='60' rx='12' fill='rgba(214,143,186,0.86)'/><rect x='346' y='162' width='60' height='60' rx='12' fill='rgba(214,143,186,0.82)'/><rect x='408' y='162' width='60' height='60' rx='12' fill='rgba(198,127,170,0.70)'/><rect x='128' y='224' width='60' height='60' rx='12' fill='rgba(188,118,160,0.60)'/><rect x='190' y='224' width='60' height='60' rx='12' fill='rgba(205,132,177,0.70)'/><rect x='252' y='224' width='60' height='60' rx='12' fill='rgba(216,151,193,0.78)'/><rect x='314' y='224' width='60' height='60' rx='12' fill='rgba(216,151,193,0.78)'/><rect x='376' y='224' width='60' height='60' rx='12' fill='rgba(205,132,177,0.70)'/><rect x='438' y='224' width='60' height='60' rx='12' fill='rgba(188,118,160,0.60)'/><rect x='160' y='286' width='60' height='60' rx='12' fill='rgba(188,118,160,0.62)'/><rect x='222' y='286' width='60' height='60' rx='12' fill='rgba(216,151,193,0.78)'/><rect x='284' y='286' width='60' height='60' rx='12' fill='rgba(224,167,201,0.82)'/><rect x='346' y='286' width='60' height='60' rx='12' fill='rgba(216,151,193,0.78)'/><rect x='408' y='286' width='60' height='60' rx='12' fill='rgba(188,118,160,0.62)'/><rect x='190' y='348' width='60' height='60' rx='12' fill='rgba(188,118,160,0.58)'/><rect x='252' y='348' width='60' height='60' rx='12' fill='rgba(208,140,182,0.72)'/><rect x='314' y='348' width='60' height='60' rx='12' fill='rgba(208,140,182,0.72)'/><rect x='376' y='348' width='60' height='60' rx='12' fill='rgba(188,118,160,0.58)'/><rect x='222' y='410' width='60' height='60' rx='12' fill='rgba(179,111,152,0.50)'/><rect x='284' y='410' width='60' height='60' rx='12' fill='rgba(197,129,170,0.62)'/><rect x='346' y='410' width='60' height='60' rx='12' fill='rgba(179,111,152,0.50)'/><rect x='252' y='472' width='60' height='60' rx='12' fill='rgba(168,102,144,0.38)'/><rect x='314' y='472' width='60' height='60' rx='12' fill='rgba(168,102,144,0.38)'/><rect x='430' y='246' width='18' height='18' rx='5' fill='rgba(112,255,202,0.88)' filter='url(%23g)'/><rect x='452' y='308' width='16' height='16' rx='4' fill='rgba(112,255,202,0.74)' filter='url(%23g)'/><path d='M352 148a108 108 0 0 1 96 96' fill='none' stroke='rgba(116,255,204,0.78)' stroke-width='9' stroke-linecap='round'/><path d='M366 126a142 142 0 0 1 126 126' fill='none' stroke='rgba(116,255,204,0.34)' stroke-width='7' stroke-linecap='round'/></g></svg>")
          no-repeat center / contain;
        transform: rotate(-2deg);
      }

      .vp-grid {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 54px 54px;
        opacity: 0.08;
      }

      .vp-trust-pulse {
        animation: vpTrustPulse 1.9s ease-in-out infinite;
      }

      

      .benefit-float {
        animation: benefitFloat 3.6s ease-in-out infinite;
      }

      .benefit-float:nth-child(2) { animation-delay: 0.25s; }
      .benefit-float:nth-child(3) { animation-delay: 0.50s; }
      .benefit-float:nth-child(4) { animation-delay: 0.75s; }

      
.vp-orbit-pulse {
  transform-origin: 41px 41px;
  animation: vpArcPulse 3.2s ease-in-out infinite;
}

.vp-orbit-pulse-2 {
  transform-origin: 41px 41px;
  animation: vpArcPulseTwo 4.4s ease-in-out infinite;
}

.vp-logo-ring-main {
  transform-origin: 41px 41px;
  animation: vpLogoRingMain 2.8s linear infinite;
}

.vp-logo-ring-outer {
  transform-origin: 41px 41px;
  animation: vpLogoRingOuter 4.2s linear infinite;
}

@keyframes vpLogoRingMain {
  0% {
    opacity: 0.96;
    stroke-dashoffset: 0;
  }
  100% {
    opacity: 0.96;
    stroke-dashoffset: -164;
  }
}

@keyframes vpLogoRingOuter {
  0% {
    opacity: 0.58;
    stroke-dashoffset: 0;
  }
  100% {
    opacity: 0.58;
    stroke-dashoffset: 168;
  }
}

@keyframes vpArcPulse {
        0%, 14%, 27%, 100% {
          opacity: 0.12;
          transform: rotate(-90deg);
          filter: drop-shadow(0 0 0 rgba(255,255,255,0));
        }
        17% {
          opacity: 1;
          transform: rotate(-42deg);
          filter:
            drop-shadow(0 0 4px rgba(255,255,255,0.95))
            drop-shadow(0 0 12px rgba(255,255,255,0.78))
            drop-shadow(0 0 22px rgba(207,139,180,0.22));
        }
        20% {
          opacity: 0.38;
          transform: rotate(-6deg);
          filter:
            drop-shadow(0 0 2px rgba(255,255,255,0.55))
            drop-shadow(0 0 8px rgba(255,255,255,0.25));
        }
        23% {
          opacity: 0.96;
          transform: rotate(18deg);
          filter:
            drop-shadow(0 0 5px rgba(255,255,255,0.92))
            drop-shadow(0 0 13px rgba(255,255,255,0.68));
        }
      }

      @keyframes vpArcPulseTwo {
        0%, 38%, 55%, 100% {
          opacity: 0.08;
          transform: rotate(88deg);
          filter: drop-shadow(0 0 0 rgba(255,255,255,0));
        }
        42% {
          opacity: 0.9;
          transform: rotate(126deg);
          filter:
            drop-shadow(0 0 4px rgba(255,255,255,0.86))
            drop-shadow(0 0 12px rgba(255,255,255,0.60))
            drop-shadow(0 0 20px rgba(207,139,180,0.18));
        }
        46% {
          opacity: 0.3;
          transform: rotate(150deg);
        }
        50% {
          opacity: 0.82;
          transform: rotate(176deg);
          filter:
            drop-shadow(0 0 3px rgba(255,255,255,0.78))
            drop-shadow(0 0 9px rgba(255,255,255,0.42));
        }
      }

      @keyframes benefitFloat {
        0%, 100% { transform: translateY(0); border-color: rgba(255,255,255,0.05); }
        50% { transform: translateY(-2px); border-color: rgba(207,139,180,0.10); }
      }

      @keyframes vpTrustPulse {
        0% {
          box-shadow:
            0 0 0 rgba(155,104,140,0),
            0 0 0 1px rgba(155,104,140,0.08) inset;
        }
        50% {
          box-shadow:
            0 0 18px rgba(207,139,180,0.14),
            0 0 0 1px rgba(155,104,140,0.18) inset;
        }
        100% {
          box-shadow:
            0 0 0 rgba(155,104,140,0),
            0 0 0 1px rgba(155,104,140,0.08) inset;
        }
      }

     
      @keyframes vpGlowBreath {
  0% {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.04),
      0 0 0 1px rgba(207,139,180,0.08),
      0 0 8px rgba(207,139,180,0.12),
      0 0 18px rgba(155,104,140,0.08);
    border-color: rgba(207,139,180,0.16);
  }

  50% {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.06),
      0 0 0 1px rgba(207,139,180,0.18),
      0 0 18px rgba(207,139,180,0.24),
      0 0 36px rgba(155,104,140,0.14);
    border-color: rgba(225,184,207,0.26);
  }

  100% {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.04),
      0 0 0 1px rgba(207,139,180,0.08),
      0 0 8px rgba(207,139,180,0.12),
      0 0 18px rgba(155,104,140,0.08);
    border-color: rgba(207,139,180,0.16);
  }
}
      @keyframes pulse {
        0% { opacity: 0.4; }
        50% { opacity: 1; }
        100% { opacity: 0.4; }
      }

      @media (max-width: 720px) {
        .vp-face::before {
          width: 88vw;
          height: 72vh;
          right: -20%;
          top: 8%;
          opacity: 0.18;
        }
      }

      .plan-glow-card {
        position: relative;
        overflow: hidden;
        transition:
          box-shadow 0.22s ease,
          border-color 0.22s ease,
          transform 0.18s ease,
          filter 0.22s ease;
      }

      .plan-glow-card::before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        pointer-events: none;
        background:
          radial-gradient(
            circle at 50% 50%,
            rgba(228,208,221,0.22) 0%,
            rgba(199,144,184,0.18) 30%,
            rgba(178,120,164,0.12) 52%,
            rgba(155,104,140,0.05) 72%,
            rgba(155,104,140,0) 82%
          );
        opacity: 0.7;
        filter: blur(12px);
        animation: planBreathGlow 2.6s ease-in-out infinite;
      }

      .plan-glow-card::after {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.22s ease;
        background:
          radial-gradient(
            circle at 50% 50%,
            rgba(243,230,238,0.10) 0%,
            rgba(199,144,184,0.09) 34%,
            rgba(155,104,140,0.05) 58%,
            rgba(155,104,140,0) 78%
          );
      }

      .plan-glow-card:hover,
      .plan-glow-card:focus-visible,
      .plan-glow-card.is-plan-hovered {
        border-color: rgba(207,139,180,0.28) !important;
        box-shadow:
          inset 0 1px 0 rgba(255,235,215,0.12),
          0 0 0 1px rgba(207,139,180,0.12),
          0 0 24px rgba(207,139,180,0.14),
          0 0 56px rgba(155,104,140,0.10),
          0 18px 34px rgba(0,0,0,0.28);
        filter: brightness(1.06);
        transform: translateY(-1px);
      }

      .plan-glow-card:hover::after,
      .plan-glow-card:focus-visible::after,
      .plan-glow-card.is-plan-hovered::after {
        opacity: 1;
      }

      @keyframes planBreathGlow {
        0%, 100% {
          opacity: 0.28;
          transform: scale(0.98);
          filter: blur(10px);
        }
        50% {
          opacity: 0.9;
          transform: scale(1.05);
          filter: blur(18px);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);
}

/* ===================== reusable ===================== */
function Logo() {
  return (
    <div style={styles.logoShell}>
      <svg
        width="96"
        height="96"
        viewBox="0 0 82 82"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="bearGlow" x1="0" y1="0" x2="82" y2="82">
            <stop offset="0%" stopColor="#ffe7f3" />
            <stop offset="45%" stopColor="#e5a6ca" />
            <stop offset="100%" stopColor="#b97fb6" />
          </linearGradient>
          <linearGradient id="bearSoft" x1="0" y1="0" x2="82" y2="82">
            <stop offset="0%" stopColor="rgba(255,232,245,0.98)" />
            <stop offset="100%" stopColor="rgba(209,141,188,0.88)" />
          </linearGradient>
          <radialGradient id="logoAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,232,245,0.34)" />
            <stop offset="55%" stopColor="rgba(255,196,226,0.16)" />
            <stop offset="100%" stopColor="rgba(255,196,226,0)" />
          </radialGradient>
          <filter id="bearOuterGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ringBloom" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 1.3 0"
            />
          </filter>
        </defs>

        <circle cx="41" cy="41" r="34" fill="url(#logoAura)" opacity="0.68" />

        <circle
          cx="41"
          cy="41"
          r="31"
          fill="none"
          stroke="rgba(255,233,245,0.98)"
          strokeWidth="2.3"
          strokeDasharray="132 32"
          strokeLinecap="round"
          className="vp-logo-ring-main"
          
        />
        <circle
          cx="41"
          cy="41"
          r="35"
          fill="none"
          stroke="rgba(255,194,225,0.68)"
          strokeWidth="1.6"
          strokeDasharray="116 48"
          strokeLinecap="round"
          className="vp-logo-ring-outer"
          
        />

        <rect x="6" y="6" width="70" height="70" rx="22" fill="rgba(255,255,255,0.03)" stroke="rgba(232,177,213,0.18)" />
        <rect x="17" y="18" width="12" height="12" rx="4" fill="url(#bearGlow)" filter="url(#bearOuterGlow)" />
        <rect x="53" y="18" width="12" height="12" rx="4" fill="url(#bearGlow)" filter="url(#bearOuterGlow)" />
        <rect x="17" y="30" width="12" height="12" rx="4" fill="url(#bearGlow)" />
        <rect x="29" y="30" width="12" height="12" rx="4" fill="url(#bearGlow)" />
        <rect x="41" y="30" width="12" height="12" rx="4" fill="url(#bearGlow)" />
        <rect x="53" y="30" width="12" height="12" rx="4" fill="url(#bearGlow)" />
        <rect x="17" y="42" width="12" height="12" rx="4" fill="url(#bearSoft)" />
        <rect x="29" y="42" width="12" height="12" rx="4" fill="url(#bearSoft)" />
        <rect x="41" y="42" width="12" height="12" rx="4" fill="url(#bearSoft)" />
        <rect x="53" y="42" width="12" height="12" rx="4" fill="url(#bearSoft)" />
        <rect x="29" y="54" width="12" height="12" rx="4" fill="rgba(195,132,178,0.82)" />
        <rect x="41" y="54" width="12" height="12" rx="4" fill="rgba(195,132,178,0.82)" />

        <path d="M44 22a18 18 0 0 1 16 16" fill="none" stroke="rgba(136,255,218,0.84)" strokeWidth="2.9" strokeLinecap="round" className="vp-orbit-pulse" />
        <path d="M47 18a24 24 0 0 1 22 22" fill="none" stroke="rgba(136,255,218,0.40)" strokeWidth="2.5" strokeLinecap="round" className="vp-orbit-pulse-2" />
      </svg>
    </div>
  );
}

function LangSwitcher({ lang, setLang, inline = false }) {
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div style={inline ? styles.langWrapInline : styles.langWrap}>
      <button
        type="button"
        style={styles.langButton}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{current.flag}</span>
        <span style={styles.langButtonCode}>{current.short}</span>
        <span style={styles.langButtonArrow}>▾</span>
      </button>

      {open && (
        <div style={inline ? styles.langDropdownInline : styles.langDropdown}>
          {languages.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                style={{
                  ...styles.langItem,
                  ...(active ? styles.langItemActive : {}),
                }}
                onClick={() => {
                  setLang(l.code);
                  localStorage.setItem("language", l.code);
                  setOpen(false);
                }}
              >
                <span style={styles.langItemLeft}>
                  <span>{l.flag}</span>
                  <span style={styles.langShort}>{l.short}</span>
                  <span>{l.label}</span>
                </span>
                {active ? <span>✔</span> : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}



function buildRabbitMatrix(offsetX = 0, seed = 0, tone = "pink") {
  const outlineRects = [];
  const solidRects = [];
  const stripeRects = [];
  const sparkRects = [];
  const step = 4.45;
  const startY = 6.5;

  for (let gy = 0; gy < 34; gy += 1) {
    for (let gx = 0; gx < 18; gx += 1) {
      const u = gx - 8.5;
      const v = gy - 17.5;

      const head = ((u) / 6.9) ** 2 + ((v + 1.2) / 7.4) ** 2 <= 1;
      const body = ((u + 0.1) / 9.1) ** 2 + ((v - 12.2) / 11.8) ** 2 <= 1;
      const earL = ((u + 3.9) / 2.8) ** 2 + ((v + 11.8) / 9.6) ** 2 <= 1;
      const earR = ((u - 3.9) / 2.8) ** 2 + ((v + 11.8) / 9.6) ** 2 <= 1;
      const inside = head || body || earL || earR;

      if (!inside) continue;

      const dense = head || earL || earR ? 68 : 76;
      const noise = (gx * 19 + gy * 31 + seed * 17) % 100;
      if (noise > dense) continue;

      const tierSeed = (gx * 13 + gy * 7 + seed * 5) % 15;
      const size = tierSeed < 8 ? 1.65 : tierSeed < 12 ? 2.55 : 4.2;
      const x = offsetX + gx * step + (step - size) / 2;
      const y = startY + gy * step + (step - size) / 2;
      const twinkleClass = ["twinkle-a", "twinkle-b", "twinkle-c"][(gx + gy + seed) % 3];

      outlineRects.push({
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        size,
        cls: twinkleClass,
        delay: `${(((gx * 0.23 + gy * 0.17 + seed * 0.29) % 4.8)).toFixed(2)}s`,
      });
    }
  }

  const solidTone = tone === "blue"
    ? {
        base: "rabbit-solid blue",
        soft: "rabbit-solid blue soft",
        hot: "rabbit-solid blue hot",
      }
    : {
        base: "rabbit-solid",
        soft: "rabbit-solid soft",
        hot: "rabbit-solid hot",
      };

  const solidBlocks = [
    { gx: 4.6, gy: 6.1, size: 8.4, cls: solidTone.soft },
    { gx: 11.0, gy: 9.2, size: 9.2, cls: solidTone.base },
    { gx: 7.2, gy: 22.0, size: 8.8, cls: solidTone.hot },
    { gx: 10.8, gy: 16.0, size: 7.2, cls: solidTone.soft },
  ];

  solidBlocks.forEach((block, index) => {
    solidRects.push({
      x: Number((offsetX + block.gx * step).toFixed(2)),
      y: Number((startY + block.gy * step).toFixed(2)),
      size: block.size,
      cls: block.cls,
      delay: `${(1.1 + index * 0.6 + seed * 0.18).toFixed(2)}s`,
    });
  });

  const stripeBlocks = [
    { gx: 10.6, gy: 18.6, w: 6.4, h: 6.4 },
    { gx: 12.2, gy: 19.7, w: 9.0, h: 9.0 },
    { gx: 9.0, gy: 21.0, w: 7.2, h: 7.2 },
    { gx: 12.6, gy: 22.2, w: 8.2, h: 8.2 },
    { gx: 10.8, gy: 24.4, w: 6.9, h: 6.9 },
  ];

  stripeBlocks.forEach((block, index) => {
    stripeRects.push({
      x: Number((offsetX + block.gx * step).toFixed(2)),
      y: Number((startY + block.gy * step).toFixed(2)),
      w: block.w,
      h: block.h,
      delay: `${(0.8 + index * 0.5 + seed * 0.13).toFixed(2)}s`,
    });
  });

  for (let i = 0; i < 42; i += 1) {
    const x = offsetX - 6 + ((i * 17 + seed * 11) % 96);
    const y = 118 + ((i * 13 + seed * 7) % 38);
    const size = i % 9 === 0 ? 1.9 : 1.1;
    sparkRects.push({
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      size,
      delay: `${((i * 0.31 + seed * 0.47) % 6.8).toFixed(2)}s`,
    });
  }

  return { outlineRects, solidRects, stripeRects, sparkRects };
}

function PixelBearPanel() {
  const leftRabbit = useMemo(() => buildRabbitMatrix(42, 1, "pink"), []);
  const rightRabbit = useMemo(() => buildRabbitMatrix(172, 2, "blue"), []);

  const renderRabbit = (rabbit, key, motionClass) => (
    <g
  key={key}
  className={motionClass}
  style={{
    "--rand": Math.random(),
    "--rand2": Math.random()
  }}
>
      {rabbit.outlineRects.map((rect, index) => (
        <rect
          key={`${key}-o-${index}`}
          x={rect.x}
          y={rect.y}
          width={rect.size}
          height={rect.size}
          className={`rabbit-outline ${rect.cls}`}
          style={{ animationDelay: rect.delay }}
        />
      ))}

      {rabbit.solidRects.map((rect, index) => (
        <rect
          key={`${key}-s-${index}`}
          x={rect.x}
          y={rect.y}
          width={rect.size}
          height={rect.size}
          className={rect.cls}
          style={{ animationDelay: rect.delay }}
        />
      ))}

      {rabbit.stripeRects.map((rect, index) => (
        <g key={`${key}-st-${index}`} style={{ animationDelay: rect.delay }}>
          <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} className="rabbit-stripe" />
          <path
            d={`M ${rect.x + 1.1} ${rect.y} V ${rect.y + rect.h} M ${rect.x + rect.w / 2} ${rect.y} V ${rect.y + rect.h} M ${rect.x + rect.w - 1.1} ${rect.y} V ${rect.y + rect.h}`}
            className="rabbit-stripe"
          />
        </g>
      ))}

      {rabbit.sparkRects.map((rect, index) => (
        <rect
          key={`${key}-p-${index}`}
          x={rect.x}
          y={rect.y}
          width={rect.size}
          height={rect.size}
          className="rabbit-spark"
          style={{ animationDelay: rect.delay }}
        />
      ))}
    </g>
  );

  return (
    <div className="pixel-bear-panel">
      <svg className="pixel-bear-svg" viewBox="0 0 320 170" aria-hidden="true">
        {renderRabbit(leftRabbit, "left", "rabbit-float-a")}
        {renderRabbit(rightRabbit, "right", "rabbit-float-b")}
      </svg>
    </div>
  );
}

function PulseButton({ children, onClick, style, disabled, title, className = "" }) {
  const ref = useRef(null);

  const handlePress = (e) => {
    if (disabled) return;
    createSoundwaveEffect(ref.current, e);

    if (ref.current) {
      ref.current.classList.add("is-plan-hovered");
      setTimeout(() => {
        ref.current?.classList.remove("is-plan-hovered");
      }, 220);
    }
  };

  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      title={title}
      className={`pulse-btn rabbit-matrix-btn ${className}`.trim()}
      style={{
        ...styles.buttonBase,
        ...style,
        ...(disabled ? styles.buttonDisabled : {}),
      }}
      disabled={disabled}
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

function IconCloseButton({ onClick, title }) {
  return (
    <PulseButton title={title} onClick={onClick} style={styles.closeBtn}>
      ✕
    </PulseButton>
  );
}

/* ===================== payment page ===================== */
function PaymentPage({ lang, setLang }) {
  const t = tFor(lang);

  console.log("当前语言 lang =", lang);

  if (lang === "hk") console.log("👉 当前语言：繁体中文");
  else if (lang === "en") console.log("👉 当前语言：英语");
  else if (lang === "ru") console.log("👉 当前语言：俄语");
  else if (lang === "bg") console.log("👉 当前语言：保加利亚语");
  else if (lang === "es") console.log("👉 当前语言：西班牙语");
  else if (lang === "it") console.log("👉 当前语言：意大利语");
  else if (lang === "ja") console.log("👉 当前语言：日语");
  else if (lang === "ko") console.log("👉 当前语言：韩语");
  else console.log("👉 当前语言：未知语言", lang);

  console.log("unlockContact =", t.unlockContact);

  const [sessionId, setSessionId] = useState("");
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(t.payWaiting);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  const plan = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const p = urlParams.get("plan");
    return p === "yearly" ? "yearly" : "monthly";
  }, []);

  useEffect(() => {
    setStatus(t.payWaiting);
  }, [t.payWaiting]);

  useEffect(() => {
    async function initSession() {
      try {
        let sid = localStorage.getItem("sessionId");

        if (!sid) {
          const data = await fetchJsonSafe(`${API_BASE}/api/session`, {
  method: "POST",
});
          sid = data.sessionId;
          localStorage.setItem("sessionId", sid);
        }

        setSessionId(sid);
      } catch (e) {
        console.error("Payment init failed", e);
        setStatus(t.paymentCheckFailed);
      }
    }

    initSession();
  }, [t.paymentCheckFailed]);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    async function initPayment() {
      try {
        localStorage.removeItem("latestOrder");

        let membershipData = { active: false, endsAt: null };

        try {
          membershipData = await fetchJsonSafe(
            `${API_BASE}/api/membership/${sessionId}?t=${Date.now()}`
          );
        } catch (e) {
          console.error("membership init error:", e);
        }

        if (cancelled) return;

        if (membershipData.active) {
          if (membershipData.endsAt) {
            localStorage.setItem("expiryDate", membershipData.endsAt);
          }
          localStorage.setItem("isPaid", "true");
          setAlreadyPaid(true);
          setStatus(t.paidAlready);
          return;
        }

        const orderData = await fetchJsonSafe(`${API_BASE}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            plan,
            payerAddress: localStorage.getItem("lastCheckedWallet") || null,
          }),
        });

        if (cancelled) return;

        setAlreadyPaid(false);
        setOrder(orderData);
        localStorage.setItem("latestOrder", JSON.stringify(orderData));
        setStatus(t.payReady);
      } catch (e) {
        console.error("initPayment failed", e);
        setStatus(t.createOrderFailed);
      }
    }

    initPayment();

    return () => {
      cancelled = true;
    };
  }, [sessionId, plan, t.paidAlready, t.payReady, t.createOrderFailed]);

  useEffect(() => {
    if (!order?.orderId || !sessionId || alreadyPaid) return;

    let cancelled = false;

    const timer = setInterval(async () => {
      try {
        const data = await fetchJsonSafe(
          `${API_BASE}/api/orders/${order.orderId}?t=${Date.now()}`
        );

        if (cancelled) return;

        const merged = { ...order, ...data };
        setOrder(merged);
        localStorage.setItem("latestOrder", JSON.stringify(merged));

        if (
          data.status === "paid" &&
          data.txHash &&
          String(data.txHash).trim() !== ""
        ) {
          const orderMembershipActive = !!data?.membership?.active;
          const orderMembershipEndsAt = data?.membership?.expiry || null;

          let membershipData = {
            active: orderMembershipActive,
            endsAt: orderMembershipEndsAt,
          };

          if (!membershipData.active) {
            for (let i = 0; i < 8; i += 1) {
              try {
                membershipData = await fetchJsonSafe(
                  `${API_BASE}/api/membership/${sessionId}?t=${Date.now()}`
                );

                if (membershipData.active) break;
              } catch (e) {
                console.error("refresh membership after payment failed", e);
              }

              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          }

          if (membershipData.active) {
            clearInterval(timer);
            localStorage.setItem("isPaid", "true");
            setAlreadyPaid(true);

            if (membershipData.endsAt) {
              localStorage.setItem("expiryDate", membershipData.endsAt);
            } else {
              localStorage.removeItem("expiryDate");
            }

            window.location.replace(`${window.location.origin}/`);
          } else {
            setStatus(t.paymentCheckFailed);
          }
        }
      } catch (e) {
        console.error("payment poll failed", e);
      }
    }, 3000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [order?.orderId, sessionId, alreadyPaid]);

  const qrUrl =
    order?.paymentAddress
      ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
          order.paymentAddress
        )}`
      : "";

  return (
    <div style={styles.page}>
      <div className="vp-grid" />

      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.titleRow}>
            <Logo />
            <div style={styles.brandBlock}>
              <div style={styles.brandTitle}>VOIDPULSE</div>
              <div style={styles.brandSub}>{t.paySubtitle}</div>
            </div>
          </div>

          <div style={styles.headerControls}>
            <PulseButton
              onClick={() => delayedNavigate("/")}
              style={styles.smallBackBtn}
            >
              ← {t.backHome}
            </PulseButton>
            <LangSwitcher lang={lang} setLang={setLang} inline />
          </div>
        </header>

        <div className="vp-trust-pulse" style={styles.trustBox}>
          <div>{t.paymentTrust1}</div>
          <div>{t.paymentTrust2}</div>
          <div>{t.paymentTrust3}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.payTitle}>{t.payTitle}</div>
          <div style={styles.payStatus}>{status}</div>

          <div style={styles.infoLine}>
            <span style={styles.labelSmall}>{t.choosePlan}</span>
            <span style={{ ...styles.priceAmountMini, marginLeft: "auto", textAlign: "right" }}>
              {order && (plan === "monthly" || plan === "yearly")
                ? `${order.amountUsdt} USDT`
                : "--"}
            </span>
          </div>

          {alreadyPaid ? (
            <>
              <div style={styles.paidBox}>
                <div style={styles.paidBoxTitle}>{t.memberActive}</div>
                <div style={styles.paidBoxSub}>{t.paidAlready}</div>
              </div>

              <PulseButton
                onClick={() => delayedNavigate("/")}
                style={styles.primaryBtn}
              >
                {t.backHome}
              </PulseButton>
            </>
          ) : order ? (
            <>
              <div style={styles.infoLine}>
                <span style={styles.labelSmall}>{t.payOrder}</span>
                <span style={styles.orderMeta}>{order.orderId}</span>
              </div>

              <div style={styles.infoLine}>
                <span style={styles.labelSmall}>{t.payAmount}</span>
                <span style={styles.orderMeta}>{order.amountUsdt} USDT</span>
              </div>

              <div style={styles.payHint}>
                ⚠️ {t.exactPayHint}
              </div>

              <div style={styles.infoLine}>
                <span style={styles.labelSmall}>{t.payNetwork}</span>
                <span style={styles.orderMeta}>{order.network}</span>
              </div>

              <div style={styles.infoLine}>
                <span style={styles.labelSmall}>{t.payToken}</span>
                <span style={styles.orderMeta}>{order.token}</span>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={styles.labelSmall}>{t.payAddress}</div>
                <div style={styles.address}>{order.paymentAddress}</div>
              </div>

              {qrUrl ? (
                <>
                  <div style={styles.qrBox}>
                    <img src={qrUrl} alt="QR" style={styles.qrImage} />
                  </div>
                  <div style={styles.walletHintText}>{t.walletHint}</div>
                </>
              ) : null}

              <PulseButton
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(order.paymentAddress);
                    alert(t.payCopy);
                  } catch {
                    alert("Copy failed");
                  }
                }}
                style={styles.secondaryBtn}
              >
                {t.payCopy}
              </PulseButton>

              <div style={styles.transferWarning}>{t.riskTransfer}</div>

              <PulseButton
                onClick={() => delayedNavigate("/")}
                style={styles.ghostButton}
              >
                {t.payBack}
              </PulseButton>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ===================== home page ===================== */
function HomePage({ lang, setLang }) {
  const t = tFor(lang);

  const [walletAddress, setWalletAddress] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [paymentType, setPaymentType] = useState("monthly");
  const [expiryDate, setExpiryDate] = useState("");
  const [result, setResult] = useState(null);
  const [lastCheckedWallet, setLastCheckedWallet] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [queryLoading, setQueryLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(null);
  const [backendReady, setBackendReady] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

 useEffect(() => {
  async function init() {
    try {
      let sid = localStorage.getItem("sessionId");

      if (!sid) {
        const data = await fetchJsonSafe(`${API_BASE}/api/session`, {
          method: "POST",
        });
        sid = data.sessionId;
        localStorage.setItem("sessionId", sid);
      }

      setSessionId(sid);

      try {
        const membershipData = await fetchJsonSafe(
          `${API_BASE}/api/membership/${sid}?t=${Date.now()}`
        );

        setIsPaid(!!membershipData.active);
        setExpiryDate(membershipData.endsAt || "");
        localStorage.setItem(
          "isPaid",
          membershipData.active ? "true" : "false"
        );

        if (membershipData.endsAt) {
          localStorage.setItem("expiryDate", membershipData.endsAt);
        } else {
          localStorage.removeItem("expiryDate");
        }
      } catch (membershipErr) {
        console.error("membership init error:", membershipErr);
        setIsPaid(false);
        setExpiryDate("");
      }

      setBackendReady(true);
      // free-count fix: removed hidden prewarm /api/query call so free checks are not consumed on load

      const today = getTodayKey();
      const savedDate = localStorage.getItem("queryDate");
      const savedCount = parseInt(
        localStorage.getItem("queryCount") || "0",
        10
      );

      if (savedDate === today) {
        setQueryCount(savedCount);
      } else {
        localStorage.setItem("queryDate", today);
        localStorage.setItem("queryCount", "0");
        setQueryCount(0);
      }

      const savedLastWallet = localStorage.getItem("lastCheckedWallet");
      if (savedLastWallet) {
        setLastCheckedWallet(savedLastWallet);
      }
    } catch (e) {
      console.error("home init failed", e);
    }
  }

  init();
}, []);


  const changeLanguage = (newLang) => {
    localStorage.setItem("language", newLang);
    setLang(newLang);
  };

  const goToPayment = (plan = paymentType) => {
  setUnlocking(true);
  window.location.href = `/payment?plan=${plan}`;
};

  const buildResultFromApi = (cleanAddress, data, paidFlag = isPaid) => {
    console.log("projectDetails:", data.projectDetails);
    const backendProjects = data.projectDetails?.length
  ? data.projectDetails.map((p) => {
      const displayValue =
        p.value && p.value !== "TBA" && String(p.value).trim() !== ""
          ? String(p.value).trim()
          : p.estimatedValue &&
            p.estimatedValue !== "TBA" &&
            String(p.estimatedValue).trim() !== ""
          ? String(p.estimatedValue).trim()
          : "$50 - $200";

      return {
        name: p.name,
        token: p.token || "TBA",
        value: displayValue,
        estimatedValue: displayValue,
        network: p.network || "Multiple",
        gasToken: p.gasToken || "ETH",
        claimType: p.claimType || "predicted",
        claimLive: !!p.claimLive,
        deadline: p.deadline || "TBA",
        officialUrl:
          (p.claimUrl && String(p.claimUrl).trim()) ||
          (p.projectUrl && String(p.projectUrl).trim()) ||
          (p.actionUrl && String(p.actionUrl).trim()) ||
          "",
        sourceType: p.sourceType || "unknown",
      };
    })
  : normalizeProjects(data.projects || []);
console.log("query api raw data full:", JSON.stringify(data, null, 2));
const enrichedProjects = enrichProjects(backendProjects, data.score ?? 0);

let displayProjects = [...enrichedProjects];

const fallbackProjects = projectCatalog.filter(
  (item) =>
    !displayProjects.some(
      (p) => p.name.toLowerCase() === item.name.toLowerCase()
    )
);

if (paidFlag) {
  displayProjects = [
    ...displayProjects,
    ...fallbackProjects.map((item) => ({
      ...item,
      value: item.value && item.value !== "-" ? item.value : "$80 - $300",
      sourceType: item.sourceType || "community",
      claimLive: item.claimLive || false,
      claimType: item.claimType || "predicted",
    })),
  ];
} else if (displayProjects.length < 4) {
  displayProjects = [
    ...displayProjects,
    ...fallbackProjects.slice(0, 4 - displayProjects.length).map((item) => ({
      ...item,
      value: item.value && item.value !== "-" ? item.value : "$80 - $300",
      sourceType: "community",
      claimLive: false,
      claimType: "predicted",
    })),
  ];
}

    const freeVisibleCount = paidFlag
  ? enrichedProjects.length
  : 4;

  const sortedDisplayProjects = [...displayProjects].sort((a, b) => {
  const aPredicted = a.claimType === "predicted" ? 1 : 0;
  const bPredicted = b.claimType === "predicted" ? 1 : 0;
  return aPredicted - bPredicted;
});
    const visibleProjects = paidFlag
  ? displayProjects
  : sortedDisplayProjects.slice(0, 4);
  
    const lockedCount = paidFlag
      ? 0
      : Math.max(enrichedProjects.length - visibleProjects.length, 0);

    return {
      found: !!data.found || visibleProjects.length > 0,
      score: data.score ?? 0,
      estimatedValue: data.estimatedValue || "-",
      projects: visibleProjects,
      lockedCount,
      totalProjects: enrichedProjects.length,
      title: t.highValueDetected,
      network: visibleProjects[0]?.network || "Multiple",
      gasToken: visibleProjects[0]?.gasToken || "-",
      claimType: visibleProjects[0]?.claimType || "predicted",
      claimLive: visibleProjects[0]?.claimLive || false,
      officialUrl: visibleProjects[0]?.officialUrl || "",
      deadline: visibleProjects[0]?.deadline || "TBA",
      sourceType: visibleProjects[0]?.sourceType || "unknown",
      wallet: cleanAddress,
    };
  };

 const handleQuery = async (addressOverride) => {
  const cleanAddress = (addressOverride || walletAddress).trim();

  if (!isValidEvmAddress(cleanAddress)) {
    alert(t.invalidAddress);
    return;
  }

  if (!sessionId) {
    alert("Session not ready");
    return;
  }

  let membershipActive = isPaid;

  try {
    const membershipData = await fetchJsonSafe(
      `${API_BASE}/api/membership/${sessionId}?t=${Date.now()}`
    );

    membershipActive = !!membershipData.active;
    setIsPaid(membershipActive);

    if (membershipData.endsAt) {
      setExpiryDate(membershipData.endsAt);
      localStorage.setItem("expiryDate", membershipData.endsAt);
    } else {
      setExpiryDate("");
      localStorage.removeItem("expiryDate");
    }

    localStorage.setItem("isPaid", membershipActive ? "true" : "false");
  } catch (e) {
    console.error("refresh membership before query failed", e);
  }

  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("queryDate");
  let count = parseInt(localStorage.getItem("queryCount") || "0", 10);

  if (savedDate !== today) {
    localStorage.setItem("queryDate", today);
    localStorage.setItem("queryCount", "0");
    count = 0;
  }

  // Do not hard-block on the frontend before the request.
  // The backend is the source of truth for the 3 free checks rule,
  // so the 4th query will return FREE_LIMIT_REACHED and then show the modal.

  try {
    setQueryLoading(true);

    const startTime = Date.now();

    const data = await fetchJsonSafe(`${API_BASE}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        walletAddress: cleanAddress,
      }),
    });

    const elapsed = Date.now() - startTime;
    const minDelay = 3000;

    if (elapsed < minDelay) {
      await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
    }

    if (data.code === "FREE_LIMIT_REACHED") {
      setShowLimitModal(true);
      setRedirectCountdown(3);

      setTimeout(() => {
        setRedirectCountdown(2);
      }, 1000);

      setTimeout(() => {
        setRedirectCountdown(1);
      }, 2000);

      setTimeout(() => {
        setRedirectCountdown(null);
        goToPayment(paymentType);
      }, 3000);

      return;
    }

    if (!membershipActive) {
      count += 1;
      localStorage.setItem("queryCount", String(count));
      setQueryCount(count);
    }

    localStorage.setItem("queryDate", today);
    localStorage.setItem("lastCheckedWallet", cleanAddress);
    setLastCheckedWallet(cleanAddress);

    const builtResult = buildResultFromApi(cleanAddress, data, membershipActive);
    setResult(builtResult);
    localStorage.setItem("latestQueryResult", JSON.stringify(builtResult));
    setWalletAddress("");
  } catch (e) {
    console.error("query failed", e);
    alert(t.limitReached);
  } finally {
    setQueryLoading(false);
  }
};

  const hotAirdrops = [
    {
      name: "StarkNet",
      token: "STRK",
      amount: "500",
      value: "$800",
      status: "claimable",
      sourceType: "verified",
    },
    {
      name: "LayerZero",
      token: "ZRO",
      amount: t.upcoming,
      value: "$200 - $500",
      status: "upcoming",
      sourceType: "verified",
    },
    {
      name: "ZkSync",
      token: "ZKS",
      amount: t.upcoming,
      value: "$100 - $300",
      status: "upcoming",
      sourceType: "community",
    },
  ];

  const resultSourceBadge = result ? getSourceBadge(result.sourceType, t) : null;

  return (
    <>
      <div style={styles.page}>
          <div className="vp-grid" />

        <div style={styles.container}>
          <header style={styles.header}>
            <div style={styles.titleRow}>
              <Logo />
              <div style={styles.brandBlock}>
                <div style={styles.brandTitle}>VOIDPULSE</div>
                <div style={styles.brandSub}>{t.subtitle}</div>
              </div>
            </div>

            <div style={styles.headerControls}>
              {result ? (
                <PulseButton
                  onClick={() => setResult(null)}
                  style={styles.smallBackBtn}
                >
                  ← {t.backHome}
                </PulseButton>
              ) : null}
              <LangSwitcher lang={lang} setLang={changeLanguage} inline />
            </div>
          </header>

          <div style={styles.riskBar}>
            <div style={styles.riskTitle}>{t.riskTitle}</div>
            <div style={styles.riskItem}>{t.risk1}</div>
            <div style={styles.riskItem}>{t.risk2}</div>
            <div style={styles.riskItem}>{t.risk3}</div>
          </div>

          {!result && (
            <div style={styles.paymentPanel}>
              <div style={styles.paymentPanelHeader}>
                <div>
                  <div style={styles.panelTitle}>{t.unlockTitle}</div>
                  <div style={styles.panelSub}>{t.unlockSub}</div>
                </div>
              </div>

              <div style={styles.benefitList}>
                <div className="benefit-float" style={styles.benefitItem}>✓ {t.premiumItem1}</div>
                <div className="benefit-float" style={styles.benefitItem}>✓ {t.premiumItem2}</div>
                <div className="benefit-float" style={styles.benefitItem}>✓ {t.premiumItem3}</div>
                <div className="benefit-float" style={styles.benefitItem}>✓ {t.premiumItem4}</div>
              </div>

              <PixelBearPanel />

              <PulseButton
                onClick={() => {
                  setPaymentType("monthly");
                  goToPayment("monthly");
                }}
                style={{
                  ...styles.priceOptionButton,
                  ...(paymentType === "monthly" ? styles.priceOptionActive : {}),
                }}
                className="plan-glow-card"
              >
                <div style={styles.priceHeader}>
                  <span style={styles.priceType}>{t.monthly}</span>
                </div>
                <div style={styles.priceAmount}>4.99 USDT</div>
                <div style={styles.pricePeriod}>{t.monthlyPrice}</div>
                <div style={styles.planHint}>{t.planMonthlyHint}</div>
              </PulseButton>

              <PulseButton
                onClick={() => {
                  setPaymentType("yearly");
                  goToPayment("yearly");
                }}
                style={{
                  ...styles.priceOptionButton,
                  ...(paymentType === "yearly" ? styles.priceOptionActive : {}),
                }}
                className="plan-glow-card"
              >
                <div style={styles.priceHeader}>
                  <span style={styles.priceType}>{t.yearly}</span>
                  <span style={styles.saveBadge}>{t.save}</span>
                </div>
                <div style={styles.priceAmount}>39.99 USDT</div>
                <div style={styles.pricePeriod}>{t.yearlyPrice}</div>
                <div style={styles.planHint}>{t.planYearlyHint}</div>
              </PulseButton>
            </div>
          )}

          <div style={styles.card}>
            <label style={styles.label}>{t.walletLabel}</label>

            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder={t.placeholder}
              style={styles.input}
            />

            <PulseButton
  onClick={() => handleQuery()}
  style={styles.primaryBtn}
  disabled={queryLoading}
>
  {queryLoading ? t.loading : t.queryBtn}
</PulseButton>
          </div>

          <div style={styles.topInfoRow}>
  {!isPaid ? (
    <div style={styles.freeBanner}>
      {t.freeTip.replace("{count}", String(queryCount))}
    </div>
  ) : (
    <div style={styles.proCard}>
      <div style={styles.proEyebrow}>VOIDPULSE BLACK</div>

      <div style={styles.memberTitle}>
        {t.memberActive || "PRO Access Enabled"}
      </div>
<div style={styles.memberMeta}>
  {t.expiry || "Expiry"}: {formatDate(expiryDate)}
</div>
    </div>
  )}

  {lastCheckedWallet ? (
    <div
      style={{ ...styles.lastWalletCard, cursor: "pointer" }}
      onClick={() => setWalletAddress(lastCheckedWallet)}
      title={lastCheckedWallet}
    >
      <div style={styles.lastWalletLabel}>{t.recentCheck}</div>
      <div style={styles.lastWalletValue}>
        {shortenAddress(lastCheckedWallet)}
      </div>
    </div>
  ) : null}
</div>

          {result ? (
            <div style={styles.resultCard}>
              <div style={styles.resultHeader}>
                <div>
                  <div style={styles.resultTitle}>{t.resultTitle}</div>
                  <div style={styles.resultWallet}>
                    {t.walletChecked}: {shortenAddress(result.wallet)}
                  </div>
                </div>

                <div style={styles.scoreBadge}>
                  {t.score}: {result.score}
                </div>
              </div>

              <div style={styles.resultMainTitle}>{result.title}</div>
              <div style={styles.resultSubTitle}>{t.realSignals}</div>

              {unlocking ? (
                <div style={styles.unlockingText}>
                  🔓 {t.unlockingRoutes}
                </div>
              ) : null}

              <div style={styles.lockNotice}>
  🔒 {t.lockedRouteDesc.replace("{count}", "25")}

  <div style={{ marginTop: "8px" }}>
    <a
      href="https://t.me/voidpulse_support"
      target="_blank"
      style={{
        color: "#4da6ff",
        textDecoration: "none",
        fontSize: "0.82rem",
        fontWeight: 600,
      }}
    >
      📩 {t.unlockContact}
    </a>
  </div>
</div>
              {resultSourceBadge ? (
                <div
                  style={{
                    ...styles.sourceBadge,
                    color: resultSourceBadge.color,
                    background: resultSourceBadge.bg,
                    borderColor: resultSourceBadge.border,
                  }}
                >
                  {resultSourceBadge.text}
                </div>
              ) : null}

              <div style={styles.resultGrid}>
                <div style={styles.resultStatBox}>
                  <div style={styles.resultStatLabel}>{t.estimatedValue}</div>
                  <div style={styles.resultStatValue}>{result.estimatedValue}</div>
                </div>

                <div style={styles.resultStatBox}>
                  <div style={styles.resultStatLabel}>{t.projects}</div>
                  <div style={styles.resultStatValue}>
                    {result.projects.map((p) => p.name).join(", ")}
                  </div>
                </div>

                <div style={styles.resultStatBox}>
                  <div style={styles.resultStatLabel}>{t.claimStatus}</div>
                  <div style={styles.resultStatValue}>{getClaimLabel(result, t)}</div>
                </div>

                <div style={styles.resultStatBox}>
                  <div style={styles.resultStatLabel}>{t.claimNetwork}</div>
                  <div style={styles.resultStatValue}>{result.network}</div>
                </div>
              </div>

              <div style={styles.projectList}>
                {result.projects.map((p, idx) => {
                  console.log("project item full:", JSON.stringify(p, null, 2));
                  const itemBadge = getSourceBadge(p.sourceType, t);

                  return (
                    <div
  key={`${p.name}-${idx}`}
  style={{
    ...styles.projectItem,
    cursor: "default",
  }}
>
                      <div style={{ flex: 1 }}>
                        <div style={styles.projectName}>{p.name}</div>
                        <div style={styles.projectToken}>{p.token}</div>

                        <div
                          style={{
                            ...styles.hotSourceTag,
                            color: itemBadge.color,
                            background: itemBadge.bg,
                            borderColor: itemBadge.border,
                          }}
                        >
                          {itemBadge.text}
                        </div>

                        <div style={styles.projectMetaLines}>
                          <div>{t.claimNetwork}: {p.network}</div>
                          <div>{t.gasToken}: {p.gasToken}</div>
                          <div>{t.deadline}: {p.deadline}</div>
                        </div>
                      </div>

                      <div style={styles.projectRight}>
  
  <div
  style={{
    ...styles.projectValue,
    cursor: "default",
  }}
  onClick={(e) => {
    e.stopPropagation();
  }}
>
  {(p.value && p.value !== "TBA" && String(p.value).trim() !== "")
  ? p.value
  : (p.estimatedValue && p.estimatedValue !== "TBA")
    ? p.estimatedValue
    : "-"}
</div>

                       {p.claimLive && p.officialUrl ? (
  <PulseButton
    onClick={(e) => {
      e.stopPropagation();
      delayedOpen(p.officialUrl);
    }}
    style={styles.claimActionBtn}
  >
    {t.claimNow}
  </PulseButton>
) : p.officialUrl ? (
  <PulseButton
    onClick={(e) => {
      e.stopPropagation();
      delayedOpen(p.officialUrl);
    }}
    style={styles.claimActionBtnSecondary}
  >
    {t.inspectMore}
  </PulseButton>
) : null}
                      </div>
                    </div>
                  );
                })}

                {!isPaid && result.lockedCount > 0 ? (
                  <div
                    style={{ ...styles.lockedProjectCard, cursor: "pointer" }}
                    onClick={() => goToPayment(paymentType)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={styles.lockedProjectTitle}>🔒 {t.lockedRouteTitle}</div>
                      <div style={styles.lockedProjectSub}>
                        {t.lockedRouteDesc.replace("{count}", String(result.lockedCount))}
                      </div>

                      <div style={styles.lockedMetaLines}>
                        <div>{t.lockedPotentialValue}</div>
                        <div>{t.lockedClaimPath}</div>
                        <div>{t.lockedSignalHint}</div>
                      </div>
                    </div>

                    <div style={styles.projectRight}>
                      <div style={styles.lockedValue}>••• Unlock</div>

                      <PulseButton
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPayment(paymentType);
                        }}
                        style={styles.claimActionBtn}
                      >
                        {t.upgradeTitle}
                      </PulseButton>
                    </div>
                  </div>
                ) : null}
              </div>

              <div style={styles.claimGuideBox}>
                <div style={styles.claimGuideTitle}>{t.claimGuide}</div>
                <div style={styles.claimStep}>1. {t.step1}</div>
                <div style={styles.claimStep}>2. {t.step2}</div>
                <div style={styles.claimStep}>3. {t.step3}</div>
                <div style={styles.claimStep}>4. {t.step4}</div>
                <div style={styles.claimStep}>5. {t.step5}</div>
                <div style={styles.claimStep}>{t.officialHint}</div>

                <div style={styles.resultActionRow}>
                  <PulseButton onClick={() => setResult(null)} style={styles.secondaryBtn}>
                    {t.backHome}
                  </PulseButton>

                  <PulseButton
                    onClick={() => handleQuery(result.wallet)}
                    style={styles.secondaryBtn}
                  >
                    {t.scanAgain}
                  </PulseButton>
                </div>
              </div>
            </div>
          ) : null}

          {!result && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>{t.hotAirdrops}</h3>
              <div style={styles.airdropList}>
                {hotAirdrops.map((item, i) => {
                  const badge = getSourceBadge(item.sourceType, t);

                  return (
                    <div key={i} style={styles.airdropCard}>
                      <div style={styles.airdropHeader}>
                        <div>
                          <span style={styles.airdropName}>{item.name}</span>
                          <span style={styles.airdropToken}>{item.token}</span>
                        </div>

                        <span style={styles.statusBadge}>
                          {item.status === "claimable" ? t.claimable : t.upcoming}
                        </span>
                      </div>

                      <div style={styles.airdropInfo}>
                        <span>
                          {t.quantity}: <strong>{item.amount}</strong>
                        </span>
                        <span style={styles.airdropValue}>{item.value}</span>
                      </div>

                      <div
                        style={{
                          ...styles.hotSourceTag,
                          color: badge.color,
                          background: badge.bg,
                          borderColor: badge.border,
                        }}
                      >
                        {badge.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {showLimitModal && (
        <div style={styles.paywallOverlay}>
          <div style={styles.paywallCard}>
            <div style={styles.paywallHead}>
              <div style={styles.paywallTitle}>🔒 {t.limitReached}</div>
              <IconCloseButton
                title={t.cancel}
                onClick={() => setShowLimitModal(false)}
              />
            </div>

            <div style={styles.paywallDesc}>{t.unlockSub}</div>

            <div style={styles.paywallActions}>
              <PulseButton
                style={styles.primaryBtn}
                onClick={() => goToPayment(paymentType)}
              >
                {t.upgradeTitle}
              </PulseButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ===================== main app ===================== */
export default function App() {
  useGlobalStyles();

  const [lang, setLang] = useState(getStoredLang());

  if (window.location.pathname === "/payment") {
    return <PaymentPage lang={lang} setLang={setLang} />;
  }

  return <HomePage lang={lang} setLang={setLang} />;
}

/* ===================== styles ===================== */
const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 76% 18%, rgba(214,143,186,0.07), transparent 22%), radial-gradient(circle at 18% 12%, rgba(116,255,204,0.04), transparent 18%), linear-gradient(180deg, #090b10 0%, #06070d 100%)",
    color: "#e9edf2",
    position: "relative",
    overflow: "hidden",
  },

  payHint: {
  marginTop: "6px",
  fontSize: "0.75rem",
  lineHeight: 1.4,
  color: "#e58ab7",
  fontWeight: 600,
  animation: "payHintPulse 1.6s ease-in-out infinite",
},

  container: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 1040,
    margin: "0 auto",
    padding: "26px 20px 40px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 18,
    marginBottom: 24,
  },

  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  headerControls: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },

  brandBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "left",
    minHeight: 82,
  },

  logoShell: {
    width: 104,
    height: 104,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    overflow: "visible",
    filter: "drop-shadow(0 0 8px rgba(255,214,235,0.14)) drop-shadow(0 0 16px rgba(255,186,221,0.10))",
  },

  brandTitle: {
    fontSize: 34,
    lineHeight: 1.05,
    fontWeight: 900,
    letterSpacing: "-0.03em",
    color: "#f7f8fa",
    marginBottom: 6,
  },

  brandSub: {
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
  },

  langWrap: {
    position: "absolute",
    top: 18,
    right: 20,
    zIndex: 8,
  },

  langWrapInline: {
    position: "relative",
    zIndex: 8,
  },

  langButton: {
    border: "1px solid rgba(207,139,180,0.22)",
    background: "rgba(19,16,24,0.96)",
    color: "#f4ebf1",
    borderRadius: 14,
    height: 44,
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 18px rgba(207,139,180,0.10)",
  },

  langButtonCode: {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.08em",
    color: "#d6b3c9",
  },

  langButtonArrow: {
    opacity: 0.75,
    fontSize: 12,
  },

  langDropdown: {
    marginTop: 10,
    width: 240,
    borderRadius: 18,
    padding: 10,
    background: "rgba(18,16,24,0.96)",
    border: "1px solid rgba(207,139,180,0.14)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
    backdropFilter: "blur(14px)",
  },

  langDropdownInline: {
    position: "absolute",
    right: 0,
    top: "calc(100% + 10px)",
    width: 240,
    borderRadius: 18,
    padding: 10,
    background: "rgba(18,16,24,0.96)",
    border: "1px solid rgba(207,139,180,0.14)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
    backdropFilter: "blur(14px)",
  },

  langItem: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "#edf2f7",
    borderRadius: 12,
    padding: "11px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
    marginBottom: 6,
  },

  langItemActive: {
    background: "rgba(207,139,180,0.10)",
    boxShadow: "inset 0 0 0 1px rgba(207,139,180,0.18)",
  },

  langItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  langShort: {
    minWidth: 22,
    fontWeight: 700,
    opacity: 0.9,
  },

  buttonBase: {

    minHeight: 54,
    borderRadius: 18,
    border: "1px solid rgba(207,139,180,0.28)",
    color: "#f6eaf2",
    fontWeight: 800,
    letterSpacing: "0.05em",
    background: `
      repeating-linear-gradient(
        115deg,
        rgba(233,210,226,0.06) 0px,
        rgba(233,210,226,0.06) 1px,
        rgba(233,210,226,0) 2px,
        rgba(233,210,226,0) 7px
      ),
      repeating-linear-gradient(
        65deg,
        rgba(195,147,182,0.05) 0px,
        rgba(195,147,182,0.05) 1px,
        rgba(195,147,182,0) 3px,
        rgba(195,147,182,0) 8px
      ),
      linear-gradient(
        180deg,
        rgba(83,56,74,0.98) 0%,
        rgba(58,38,54,0.98) 30%,
        rgba(99,67,90,0.98) 52%,
        rgba(38,24,35,0.99) 100%
      )
    `,
    boxShadow:
      "inset 0 1px 0 rgba(244,233,241,0.12), inset 0 -1px 0 rgba(28,16,27,0.40), 0 0 0 1px rgba(207,139,180,0.08), 0 12px 24px rgba(0,0,0,0.24)",
    padding: "0 18px"
  },

  buttonDisabled: {
    opacity: 0.62,
    cursor: "not-allowed",
  },

  closeBtn: {
    width: 44,
    minWidth: 44,
    padding: 0,
    borderRadius: 14,
    fontSize: 18,
    lineHeight: 1,
  },

  smallBackBtn: {
    minHeight: 44,
    padding: "0 14px",
    fontSize: 13,
    width: "auto",
  },

  card: {
    background: "rgba(14,18,24,0.84)",
    borderRadius: 22,
    padding: "20px",
    marginBottom: 16,
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 18px 38px rgba(0,0,0,0.28)",
    backdropFilter: "blur(10px)",
  },

  

proCardInner: {
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  minHeight: "132px",
  padding: "18px 18px 16px",
},

 proCard: {

  width: "190px",
  height: "110px",
  borderRadius: "14px",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#151018,#231425 60%,#150f18)",
  border: "1px solid rgba(207,139,180,0.18)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(207,139,180,0.06) inset"
  },

  paymentPanelHeader: {
    marginBottom: 14,
  },

  panelTitle: {
    fontSize: 20,
    fontWeight: 900,
    color: "#f4e6ef",
    marginBottom: 6,
  },

  panelSub: {
    color: "#cdb8c7",
    fontSize: 14,
    lineHeight: 1.5,
  },

  benefitList: {
    display: "grid",
    gap: 8,
    marginBottom: 15,
  },

  benefitItem: {
    color: "#dbcad6",
    fontSize: "0.92rem",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  label: {
    display: "block",
    color: "#a9b2c8",
    fontSize: "0.95rem",
    marginBottom: "10px",
    fontWeight: 600,
  },

  labelSmall: {
    color: "#a9b2c8",
    fontSize: "0.86rem",
    fontWeight: 600,
  },

  input: {
    width: "100%",
    padding: "16px 15px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(5,8,12,0.92)",
    color: "#fff",
    fontSize: "15px",
    marginBottom: "14px",
    boxSizing: "border-box",
    outline: "none",
  },

  primaryBtn: {

    width: "100%",
    borderRadius: 16,
    minHeight: 58
  },

  secondaryBtn: {
    width: "100%",
  },

  ghostButton: {
    width: "100%",
    background:
      "linear-gradient(180deg, rgba(28,30,36,0.98), rgba(17,20,26,0.98))",
    color: "#dfe7f4",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  topInfoRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },

  freeBanner: {
    padding: "12px 16px",
    background: "rgba(10,14,20,0.92)",
    borderRadius: "14px",
    color: "#bcc6d6",
    fontSize: "0.9rem",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  memberBanner: {

    padding: "16px 18px",
    background: "linear-gradient(135deg, rgba(207,139,180,0.18), rgba(122,90,125,0.10))",
    borderRadius: "14px",
    border: "1px solid rgba(207,139,180,0.22)",
    textAlign: "left",
    boxShadow: "0 12px 24px rgba(0,0,0,0.20)"
  },

 memberTitle: {
  fontSize: "13px", // ⭐缩小避免换行
  fontWeight: 700,
  color: "#f1dbe9",
  textAlign: "center",
  lineHeight: 1.2,
},

memberMetaRow: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "18px",
  paddingTop: "12px",
  borderTop: "1px solid rgba(255,255,255,0.08)",
},



  memberSub: {
    color: "#e3e8ef",
    fontSize: "0.82rem",
    marginTop: "6px",
  },

  lastWalletCard: {
    background: "rgba(10,14,20,0.92)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "12px 14px",
  },

  lastWalletLabel: {
    color: "#8a97b0",
    fontSize: "0.8rem",
    marginBottom: "5px",
  },

  lastWalletValue: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.96rem",
  },

  riskBar: {
    background: "linear-gradient(180deg, rgba(207,139,180,0.10), rgba(115,255,204,0.05))",
    border: "1px solid rgba(207,139,180,0.20)",
    borderRadius: "16px",
    padding: "14px 14px 12px",
    marginBottom: "14px",
  },

  riskTitle: {
    fontSize: "0.95rem",
    fontWeight: 800,
    color: "#ddbad1",
    marginBottom: "8px",
  },

  riskItem: {
    color: "#ddc6d3",
    fontSize: "0.86rem",
    lineHeight: 1.5,
    marginBottom: "5px",
  },

  priceOption: {
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "12px",
    cursor: "pointer",
    background: "linear-gradient(180deg, rgba(16,14,14,0.94), rgba(24,18,14,0.96))",
    transition: "all 0.2s ease",
  },

  priceOptionButton: {

    width: "100%",
    display: "block",
    textAlign: "left",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "12px",
    minHeight: "unset",
    background: `
      repeating-linear-gradient(
        115deg,
        rgba(233,210,226,0.05) 0px,
        rgba(233,210,226,0.05) 1px,
        rgba(233,210,226,0) 2px,
        rgba(233,210,226,0) 8px
      ),
      repeating-linear-gradient(
        65deg,
        rgba(195,147,182,0.04) 0px,
        rgba(195,147,182,0.04) 1px,
        rgba(195,147,182,0) 3px,
        rgba(195,147,182,0) 9px
      ),
      linear-gradient(180deg, rgba(18,16,20,0.94), rgba(25,20,28,0.96))
    `
  },

  priceOptionActive: {

    border: "1px solid rgba(207,139,180,0.28)",
    boxShadow: "0 0 0 2px rgba(207,139,180,0.10), 0 0 22px rgba(155,104,140,0.10)"
  },

  priceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  priceType: {
    color: "#edd9e7",
    fontSize: "0.92rem",
    fontWeight: 700,
  },

  saveBadge: {

    background: "rgba(207,139,180,0.14)",
    color: "#e7cde0",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 800,
    border: "1px solid rgba(207,139,180,0.22)"
  },

  priceAmount: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "#f4e6ef",
    letterSpacing: "-0.02em",
  },

  priceAmountMini: {
    fontSize: "1.06rem",
    fontWeight: 900,
    color: "#d8a8c3",
  },

  pricePeriod: {
    color: "#bfaebb",
    fontSize: "0.88rem",
  },

  planHint: {
    marginTop: 7,
    color: "#9d8f9b",
    fontSize: "0.78rem",
  },

  resultCard: {
    background: "linear-gradient(180deg, rgba(17,23,38,0.98), rgba(10,14,24,0.98))",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "16px",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.26)",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "flex-start",
    marginBottom: "14px",
  },

  resultTitle: {
    fontSize: "0.84rem",
    color: "#8ea0c0",
    marginBottom: "6px",
  },

  resultWallet: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.92rem",
  },

  scoreBadge: {

    padding: "8px 10px",
    borderRadius: "12px",
    fontSize: "0.78rem",
    border: "1px solid rgba(207,139,180,0.20)",
    whiteSpace: "nowrap",
    fontWeight: 800,
    color: "#d7b2c9",
    background: "rgba(207,139,180,0.08)"
  },

  resultMainTitle: {
    fontSize: "1.08rem",
    fontWeight: 900,
    color: "#d89abf",
    marginBottom: "6px",
  },

  resultSubTitle: {
    fontSize: "0.84rem",
    color: "#adb7ca",
    marginBottom: "10px",
  },

  noticeLine: {
    color: "#c9d0dc",
    fontSize: "0.82rem",
    marginBottom: "8px",
  },

  redirectText: {
    color: "#d4b1c8",
    fontSize: "0.9rem",
    marginTop: "8px",
    marginBottom: "10px",
    fontWeight: 800,
  },

  sourceBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.78rem",
    border: "1px solid",
    borderRadius: "999px",
    padding: "7px 12px",
    marginBottom: "14px",
    fontWeight: 700,
  },

  resultGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "12px",
  },

  resultStatBox: {
    background: "rgba(11,16,25,0.92)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "14px",
    padding: "12px",
  },

  resultStatLabel: {
    fontSize: "0.78rem",
    color: "#8fa0bf",
    marginBottom: "6px",
  },

  resultStatValue: {
    color: "#fff",
    fontWeight: 800,
    fontSize: "0.95rem",
    lineHeight: 1.35,
  },

  projectList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
    marginBottom: "12px",
  },

  projectItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 14px",
    borderRadius: "14px",
    background: "rgba(11,16,25,0.92)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  projectName: {
    fontWeight: 800,
    color: "#fff",
    fontSize: "0.97rem",
  },

  projectToken: {
    color: "#8897b0",
    fontSize: "0.82rem",
    marginTop: "3px",
    marginBottom: "8px",
  },

  hotSourceTag: {
    marginTop: "10px",
    display: "inline-flex",
    fontSize: "0.72rem",
    padding: "5px 8px",
    borderRadius: "999px",
    border: "1px solid",
    fontWeight: 700,
  },

  projectMetaLines: {
    marginTop: 10,
    color: "#aab6ca",
    fontSize: "0.78rem",
    lineHeight: 1.6,
  },

  projectRight: {
    textAlign: "right",
    minWidth: 124,
  },

  projectValue: {

    color: "#d7b2c9",
    fontWeight: 900,
    fontSize: "0.98rem",
    marginBottom: 10
  },

  claimActionBtn: {

    minHeight: 42,
    width: 120,
    fontSize: "0.76rem",
    padding: "0 10px",
    borderRadius: 14
  },

 claimActionBtnSecondary: {

  minHeight: 42,
  width: 120,
  fontSize: "0.76rem",
  padding: "0 10px",
  background: "linear-gradient(180deg, rgba(30,28,34,0.96), rgba(18,16,22,0.96))",
  color: "#d8dbea",
  border: "1px solid rgba(207,139,180,0.20)",
  backdropFilter: "blur(6px)",
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.04),
    0 0 0 1px rgba(207,139,180,0.08),
    0 0 12px rgba(207,139,180,0.12)
  `,
  animation: "vpGlowBreath 2.4s ease-in-out infinite"
  },

  claimGuideTitle: {
    color: "#fff",
    fontWeight: 800,
    fontSize: "0.95rem",
    marginBottom: "10px",
  },

  claimStep: {
    color: "#b6c1d8",
    fontSize: "0.88rem",
    lineHeight: 1.5,
    marginBottom: "6px",
  },

  resultActionRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "12px",
  },

  section: {
    marginTop: "22px",
  },

  sectionTitle: {
    fontSize: "1rem",
    color: "#d2d7e5",
    marginBottom: "12px",
  },

  airdropList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  airdropCard: {
    padding: "16px",
    background: "rgba(14,18,24,0.84)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  airdropHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  airdropName: {
    fontWeight: "bold",
    fontSize: "1rem",
    marginRight: "8px",
  },

  airdropToken: {
    color: "#8290a8",
    fontSize: "0.85rem",
  },

  statusBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    border: "1px solid rgba(207,139,180,0.18)",
    color: "#d8a8c3",
    background: "rgba(207,139,180,0.10)",
  },

  airdropInfo: {
    display: "flex",
    justifyContent: "space-between",
    color: "#a4aec2",
    fontSize: "0.9rem",
  },

  airdropValue: {
    color: "#d8a8c3",
    fontWeight: 800,
  },

  trustBox: {
    background: "rgba(207,139,180,0.08)",
    border: "1px solid rgba(207,139,180,0.22)",
    borderRadius: 18,
    padding: "14px 16px",
    marginBottom: 16,
    color: "#ffbf90",
    fontSize: 13,
    lineHeight: 1.7,
  },

  payTitle: {
    fontSize: "1.12rem",
    fontWeight: 900,
    marginBottom: "8px",
  },

  payStatus: {
    color: "#d8a8c3",
    fontWeight: 800,
    marginBottom: "12px",
  },

  infoLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    marginBottom: "10px",
  },

  orderMeta: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.88rem",
    wordBreak: "break-all",
    textAlign: "right",
  },

  address: {
    fontSize: "0.78rem",
    color: "#c6cfdd",
    marginBottom: "15px",
    wordBreak: "break-all",
    padding: "10px",
    background: "rgba(6,8,15,0.92)",
    borderRadius: "10px",
    marginTop: "8px",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  qrBox: {
    marginTop: "16px",
    padding: "20px",
    background: "#fff",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "center",
  },

  qrImage: {
    width: "200px",
    height: "200px",
    borderRadius: "8px",
  },

  walletHintText: {
    marginTop: "10px",
    fontSize: "0.82rem",
    color: "#9aa4b2",
    textAlign: "center",
  },

  transferWarning: {
    marginTop: "10px",
    fontSize: "0.78rem",
    color: "#ffbf90",
    textAlign: "center",
  },

  paidBox: {
    padding: "16px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, rgba(207,139,180,0.14), rgba(255,208,145,0.08))",
    border: "1px solid rgba(207,139,180,0.22)",
    marginBottom: "14px",
  },

  paidBoxTitle: {
    color: "#d8a8c3",
    fontWeight: 900,
    fontSize: "1rem",
    marginBottom: "6px",
  },

  paidBoxSub: {
    color: "#dee6f3",
    fontSize: "0.86rem",
  },

  paywallOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.62)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 999,
  },

  paywallCard: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(17,21,31,0.98)",
    border: "1px solid rgba(207,139,180,0.14)",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  },

  paywallHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: "10px",
  },

  paywallTitle: {
    fontSize: "1.04rem",
    fontWeight: 900,
    color: "#d8a8c3",
    lineHeight: 1.4,
  },

  paywallDesc: {
    color: "#c6d0e3",
    fontSize: "0.92rem",
    lineHeight: 1.5,
    marginBottom: "16px",
  },

  paywallActions: {
    display: "grid",
    gap: 10,
  },

  unlockingText: {
    marginBottom: "10px",
    color: "#d8a8c3",
    fontSize: "0.9rem",
    fontWeight: 900,
    animation: "pulse 1.2s infinite",
  },

  lockNotice: {
    marginBottom: "10px",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(207,139,180,0.10)",
    border: "1px solid rgba(207,139,180,0.20)",
    color: "#d8a8c3",
    fontSize: "0.86rem",
    fontWeight: 800,
  },

  lockedProjectCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 14px",
    borderRadius: "14px",
    background: "linear-gradient(180deg, rgba(22,18,18,0.96), rgba(14,12,12,0.96))",
    border: "1px solid rgba(207,139,180,0.22)",
    boxShadow: "0 0 0 1px rgba(207,139,180,0.06) inset",
  },

  lockedProjectTitle: {
    fontWeight: 900,
    color: "#d8a8c3",
    fontSize: "0.98rem",
    marginBottom: "6px",
  },

  lockedProjectSub: {
    color: "#d9c7b8",
    fontSize: "0.82rem",
    marginBottom: "10px",
  },

  lockedMetaLines: {
    color: "#bca999",
    fontSize: "0.78rem",
    lineHeight: 1.6,
  },

  lockedValue: {
    color: "#d8a8c3",
    fontWeight: 900,
    fontSize: "0.98rem",
    marginBottom: 10,
  },
};