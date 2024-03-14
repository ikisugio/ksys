export const KEIKEI_KUBUN_CHOICES = [
  { value: "shisetsu", label: "施設系" },
  { value: "houmon", label: "訪問系" },
  { value: "houmonshisetu", label: "施設訪問系" },
];

export const SUPPORT_STATUS_CHOICES = [
  { value: "zero_support", label: "初めての支援" },
  { value: "with_support", label: "支援歴有り" },
  { value: "one_follow", label: "フォローアップ１回目" },
  { value: "two_follow", label: "フォローアップ２回目" },
];

export const SUPPORT_MEANS_CHOICES = [
  { value: "houmon", label: "訪問" },
  { value: "raihou_without_support", label: "来訪（支援なし）" },
  { value: "raihou_with_support", label: "来訪（支援あり）" },
  { value: "tel", label: "ＴＥＬ（訪問カウントなし）" },
  { value: "online", label: "オンライン" },
  { value: "fax", label: "ＦＡＸ（訪問カウントなし）" },
  { value: "mail", label: "メール" },
  { value: "koushu_sanka", label: "講習等参加" },
  { value: "koushugo_shien", label: "講習後支援" },
];

export const SUPPORT_MEANS_CHOICES_WITH_SUPPORT = [
  { value: "houmon", label: "訪問" },
  // { value: "raihou_without_support", label: "来訪（支援なし）" },
  { value: "raihou_with_support", label: "来訪" },
  { value: "koushu_sanka", label: "講習等参加" },
  { value: "koushugo_shien", label: "講習後支援" },
  { value: "online", label: "オンライン" },
  { value: "tel", label: "電話" },
  { value: "fax", label: "ＦＡＸ（事業所訪問カウント対象外）" },
  { value: "mail", label: "メール（事業所訪問カウント対象外）" },
];

export const SUPPORT_MEANS_CHOICES_WITHOUT_SUPPORT = [
  { value: "houmon", label: "訪問" },
  { value: "raihou_without_support", label: "来訪" },
  // { value: "raihou_with_support", label: "来訪（支援あり）" },
  { value: "koushu_sanka", label: "講習等参加" },
  { value: "koushugo_shien", label: "講習後支援" },
  { value: "tel", label: "電話" },
  { value: "fax", label: "ＦＡＸ" },
  { value: "mail", label: "メール" },
];
