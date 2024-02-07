KEIKEI_KUBUN_CHOICES = [
    ("shisetsu", "施設系"),
    ("houmon", "訪問系"),
    ("houmonshisetu", "施設訪問系"),
]
SUPPORT_STATUS_CHOICES = [
    ("zero_support", "初めての支援"),
    ("with_support", "支援歴有り"),
    ("one_follow", "フォローアップ１回目"),
    ("two_follow", "フォローアップ２回目"),
]
SUPPORT_MEANS_CHOICES = [
    ("houmon", "訪問"),
    ("raihou_without_support", "来訪（支援なし）"),
    ("raihou_with_support", "来訪（支援あり）"),
    ("tel", "ＴＥＬ"),
    ("online", "オンライン"),
    ("fax", "ＦＡＸ"),
    ("mail", "メール"),
    ("koushu_sanka", "講習等参加"),
    ("koushugo_shien", "講習後支援"),
]
COMPANY_TYPE_CHOICES = [
    ("public", "会社（民間事業者）"),
    ("welfare", "社会福祉法人"),
    ("medical", "医療法人"),
    ("shouhi", "消費生活共同組合等"),
    ("koueki", "公益法人等"),
    ("nonprofit", "特定非営利活動法人"),
    ("job_center", "職業紹介事業所"),
    ("home_helper", "ホームヘルパー等個人"),
    ("publicity", "公営施設等"),
    ("municipality", "市町村等公共機関"),
    ("koushu_member", "講習等参加者"),
]
JIGYOSYO_INFO_CHOICES = [
    ("under_fifty", "５０人以下"),
    ("before_establishment", "開業前"),
    ("within_three_establishment", "開業３年未満"),
]
POSITION_CHOICES = [
    ("branch_manager", "支部長"),
    ("instructor", "インストラクター"),
    ("advisor", "アドバイザー"),
    ("others", "その他"),
]
