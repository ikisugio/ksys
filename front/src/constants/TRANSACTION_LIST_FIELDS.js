const TRANSACTION_LIST_FIELDS = [
  {
      "field": "actions",
      "headerName": "削除・編集",
      "sortable": false,
      "width": 80,
      "isDisplay": true
  },
  {
      "field": "visit_date",
      "headerName": "訪問日",
      "width": 100,
      "type": "date",
      "isDisplay": true
  },
  {
      "field": "keikei_kubun",
      "headerName": "系型区分",
      "width": 70,
      "type": "select",
      "isDisplay": true
  },
  {
      "field": "support_status",
      "headerName": "支援状況",
      "width": 110,
      "type": "select",
      "isDisplay": true
  },
  {
      "field": "support_means",
      "headerName": "支援方法",
      "width": 80,
      "type": "select",
      "isDisplay": true
  },
  {
      "field": "_company_type",
      "headerName": "法人種別",
      "width": 150,
      "type": "text",
      "isDisplay": true
  },
  {
      "field": "_jigyosyo_name",
      "headerName": "事業所名",
      "width": 150,
      "type": "text",
      "isDisplay": true
  },
  {
      "field": "is_under_fifty",
      "headerName": "50人以下の事業所",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "is_before_establishment",
      "headerName": "開業前事業所",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "is_within_three_years_since_estabrishment",
      "headerName": "開業３年未満の事業所",
      "width": 170,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "is_dedicated",
      "headerName": "雇用管理責任者選任の有無",
      "width": 190,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "is_participated",
      "headerName": "責任者講習受講の有無",
      "width": 170,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "_jigyosyo_is_use_kaigo_machine_subsidy",
      "headerName": "介護機器助成金の使用",
      "width": 170,
      "isDisplay": true
  },
  {
      "field": "_jigyosyo_is_use_other_subsidy",
      "headerName": "その他の助成金の使用",
      "width": 150,
      "isDisplay": true
  },
  {
      "field": "is_recruiting_on_hw",
      "headerName": "ＨＷに募集中",
      "width": 170,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "is_recruiting_on_expect_hw",
      "headerName": "ＨＷ以外に募集予定",
      "width": 170,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "is_going_to_recruit",
      "headerName": "募集予定",
      "width": 170,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "is_accepting_intern",
      "headerName": "介護実習の受入",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "will_inform_hw",
      "headerName": "労働局（ＨＷ）",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "will_inform_prefecture",
      "headerName": "都道府県",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "will_inform_others",
      "headerName": "その他の関係機関",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "done_explain_support",
      "headerName": "支援メニューの説明",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "done_knowing_problem",
      "headerName": "課題の把握",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "with_employment_consultant",
      "headerName": "雇用コンサル",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "with_health_counselor",
      "headerName": "ヘルスカウンセラー",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "with_training_coordinator",
      "headerName": "研修コーディネーター",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "with_alone_on_hw",
      "headerName": "単独",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "with_staff_on_hw",
      "headerName": "同行",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_job_posting_consult",
      "headerName": "相談",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_job_posting_inform",
      "headerName": "情報",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_working_conditions_consult",
      "headerName": "相談",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_working_conditions_inform",
      "headerName": "情報",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_welfare_benefits_consult",
      "headerName": "相談",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_welfare_benefits_inform",
      "headerName": "情報",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_workplace_communication_consult",
      "headerName": "相談",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_workplace_communication_inform",
      "headerName": "情報",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_subsidies_consult",
      "headerName": "相談",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_subsidies_inform",
      "headerName": "情報",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_care_services_consult",
      "headerName": "相談",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_care_services_inform",
      "headerName": "情報",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_workplace_environment_consult",
      "headerName": "相談",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_workplace_environment_inform",
      "headerName": "情報",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_skill_development_consult",
      "headerName": "雇用管理における能力開発（相談）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_skill_development_inform",
      "headerName": "雇用管理における能力開発（情報）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_employment_management_responsibility_consult",
      "headerName": "雇用管理責任者関係（相談）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_employment_management_responsibility_inform",
      "headerName": "雇用管理責任者関係（情報）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_other_consult",
      "headerName": "雇用管理その他（相談）",
      "width": 200,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "koyou_other_inform",
      "headerName": "雇用管理その他（情報）",
      "width": 200,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_qualification_system_training_consult",
      "headerName": "資格制度・研修情報等（相談）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_qualification_system_training_inform",
      "headerName": "資格制度・研修情報等（情報）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_job_posting_consult",
      "headerName": "求人就職関係（相談）",
      "width": 200,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_job_posting_inform",
      "headerName": "求人就職関係（情報）",
      "width": 200,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_training_plan_curriculum_consult",
      "headerName": "研修計画・カリキュラムの策定（相談）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_training_plan_curriculum_inform",
      "headerName": "研修計画・カリキュラムの策定（情報）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_subsidy_system_for_skill_development_consult",
      "headerName": "能力開発に係る助成制度関係（相談）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_subsidy_system_for_skill_development_inform",
      "headerName": "能力開発に係る助成制度関係（情報）",
      "width": 300,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_vocational_skill_development_promoter_consult",
      "headerName": "職業能力開発推進者関係（相談）",
      "width": 250,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_vocational_skill_development_promoter_inform",
      "headerName": "職業能力開発推進者関係（情報）",
      "width": 250,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_other_skill_development_consult",
      "headerName": "能力開発その他（相談）",
      "width": 200,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "noukai_other_skill_development_inform",
      "headerName": "能力開発その他（情報）",
      "width": 200,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "with_tool_utilization",
      "headerName": "ツールの活用",
      "width": 150,
      "type": "checkbox",
      "isDisplay": true
  },
  {
      "field": "visit_memo",
      "headerName": "訪問メモ",
      "width": 500,
      "type": "text",
      "isDisplay": true
  },
  {
      "field": "_jigyosyo_code",
      "headerName": "事業所コード",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_custom_code",
      "headerName": "支部独自コード",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_postal_code",
      "headerName": "事業所郵便番号",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_address",
      "headerName": "事業所住所",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_tel_number",
      "headerName": "事業所電話番号",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_fax_number",
      "headerName": "事業所FAX番号",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_repr_name",
      "headerName": "事業所代表者名",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_repr_position",
      "headerName": "事業所代表者役職",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_kourou_url",
      "headerName": "厚生労働省URL",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_kourou_release_datetime",
      "headerName": "事業所公労リリース日時",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_number_of_member",
      "headerName": "職員数",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_jigyosyo_exists_koyou_sekininsha",
      "headerName": "事業所に雇用責任者が存在するか",
      "width": 150,
      "isDisplay": false
  },
  {
      "field": "_management_description",
      "headerName": "事業所管理情報",
      "width": 150,
      "type": "text",
      "isDisplay": false
  },
  {
      "field": "_management_is_sanjo",
      "headerName": "賛助会員",
      "width": 150,
      "type": "checkbox",
      "isDisplay": false
  },
  {
      "field": "file",
      "headerName": "ファイル",
      "width": 150,
      "type": "file",
      "isDisplay": 12
  }
];

export default TRANSACTION_LIST_FIELDS.filter((obj) => obj.isDisplay === true);
