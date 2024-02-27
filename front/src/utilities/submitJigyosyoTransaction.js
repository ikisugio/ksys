import axiosInstance from "@/services/axios";

const submitJigyosyoTransaction =
  (requestMethod) =>
  async (e, formData, navigator, id = undefined) => {
    e.preventDefault();
    const {
      navigate,
      setOpenSnackbar,
      setSnackbarMessage,
      setSnackbarSeverity,
    } = navigator;

    const dataToSubmit = {
      _jigyosyo_code: formData._jigyosyo_code,
      _custom_code: formData._jigyosyo_custom_code,
      _company_name: formData._company_name,
      _jigyosyo_postal_code: formData._jigyosyo_postal_code || null,
      _jigyosyo_address: formData._jigyosyo_address || null,
      _jigyosyo_tel_number: formData._jigyosyo_tel_number || null,
      _jigyosyo_fax_number: formData._jigyosyo_fax_number || null,
      _jigyosyo_repr_name: formData._jigyosyo_repr_name || null,
      _jigyosyo_repr_position: formData._jigyosyo_repr_position || null,
      _jigyosyo_kourou_url: formData._jigyosyo_kourou_url || null,
      _jigyosyo_kourou_release_datetime:
        formData._jigyosyo_kourou_release_datetime || null,
      _jigyosyo_name: formData._jigyosyo_name,
      _jigyosyo_established_date: formData._jigyosyo_established_date,
      // management: formData.management || null,
      visit_date: formData.visit_date || null,
      visit_memo: formData.visit_memo || null,
      file: formData.file || null,
      history: formData.history || null,
      keikei_kubun: formData.keikei_kubun || null,
      support_status: formData.support_status || null,
      support_means: formData.support_means || null,
      is_under_fifty: formData.is_under_fifty || false,
      is_before_establishment: formData.is_before_establishment || false,
      is_within_three_years_since_estabrishment:
        formData.is_within_three_years_since_estabrishment || false,
      is_dedicated: formData.is_dedicated || false,
      is_participated: formData.is_participated || false,
      // is_use_kaigo_machine_subsidy: formData.is_use_kaigo_machine_subsidy || false,
      // is_use_other_subsidy: formData.is_use_other_subsidy || false,
      is_use_subsidy: formData.is_use_subsidy || false,
      is_recruiting_on_hw: formData.is_recruiting_on_hw || false,
      is_recruiting_on_expect_hw: formData.is_recruiting_on_expect_hw || false,
      is_going_to_recruit: formData.is_going_to_recruit || false,
      is_accepting_intern: formData.is_accepting_intern || false,
      will_inform_hw: formData.will_inform_hw || false,
      will_inform_prefecture: formData.will_inform_prefecture || false,
      will_inform_others: formData.will_inform_others || false,
      done_explain_support: formData.done_explain_support || false,
      done_knowing_problem: formData.done_knowing_problem || false,
      with_tool_utilization: formData.with_tool_utilization || false,
      with_employment_consultant: formData.with_employment_consultant || false,
      with_health_counselor: formData.with_health_counselor || false,
      with_training_coordinator: formData.with_training_coordinator || false,
      with_alone_on_hw: formData.with_alone_on_hw || false,
      with_staff_on_hw: formData.with_staff_on_hw || false,
      koyou_job_posting_consult: formData.koyou_job_posting_consult || false,
      koyou_job_posting_inform: formData.koyou_job_posting_inform || false,
      koyou_working_conditions_consult:
        formData.koyou_working_conditions_consult || false,
      koyou_working_conditions_inform:
        formData.koyou_working_conditions_inform || false,
      koyou_welfare_benefits_consult:
        formData.koyou_welfare_benefits_consult || false,
      koyou_welfare_benefits_inform:
        formData.koyou_welfare_benefits_inform || false,
      koyou_workplace_communication_consult:
        formData.koyou_workplace_communication_consult || false,
      koyou_workplace_communication_inform:
        formData.koyou_workplace_communication_inform || false,
      koyou_subsidies_consult: formData.koyou_subsidies_consult || false,
      koyou_subsidies_inform: formData.koyou_subsidies_inform || false,
      koyou_care_services_consult:
        formData.koyou_care_services_consult || false,
      koyou_care_services_inform: formData.koyou_care_services_inform || false,
      koyou_workplace_environment_philosophy_consult:
        formData.koyou_workplace_environment_philosophy_consult || false,
      koyou_workplace_environment_philosophy_inform:
        formData.koyou_workplace_environment_philosophy_inform || false,
      koyou_workplace_environment_ict_consult:
        formData.koyou_workplace_environment_ict_consult || false,
      koyou_workplace_environment_ict_inform:
        formData.koyou_workplace_environment_ict_inform || false,
      koyou_skill_development_consult:
        formData.koyou_skill_development_consult || false,
      koyou_skill_development_inform:
        formData.koyou_skill_development_inform || false,
      koyou_employment_management_responsibility_consult:
        formData.koyou_employment_management_responsibility_consult || false,
      koyou_employment_management_responsibility_inform:
        formData.koyou_employment_management_responsibility_inform || false,
      koyou_other_consult: formData.koyou_other_consult || false,
      koyou_other_inform: formData.koyou_other_inform || false,
      noukai_qualification_system_training_consult:
        formData.noukai_qualification_system_training_consult || false,
      noukai_qualification_system_training_inform:
        formData.noukai_qualification_system_training_inform || false,
      noukai_job_posting_consult: formData.noukai_job_posting_consult || false,
      noukai_job_posting_inform: formData.noukai_job_posting_inform || false,
      noukai_training_plan_curriculum_consult:
        formData.noukai_training_plan_curriculum_consult || false,
      noukai_training_plan_curriculum_inform:
        formData.noukai_training_plan_curriculum_inform || false,
      noukai_subsidy_system_for_skill_development_consult:
        formData.noukai_subsidy_system_for_skill_development_consult || false,
      noukai_subsidy_system_for_skill_development_inform:
        formData.noukai_subsidy_system_for_skill_development_inform || false,
      noukai_vocational_skill_development_promoter_consult:
        formData.noukai_vocational_skill_development_promoter_consult || false,
      noukai_vocational_skill_development_promoter_inform:
        formData.noukai_vocational_skill_development_promoter_inform || false,
      noukai_other_skill_development_consult:
        formData.noukai_other_skill_development_consult || false,
      noukai_other_skill_development_inform:
        formData.noukai_other_skill_development_inform || false,
      _management_koyoukanri_memo: formData._management_koyoukanri_memo || null,
      _management_is_sanjo: formData._management_is_sanjo || false,
      _management_description: formData._management_description || null,
      _jigyosyo_service_type: formData._jigyosyo_service_type || null,
      _jigyosyo_number_of_member: formData._jigyosyo_number_of_member || null,
      _jigyosyo_exists_koyou_sekininsha:
        formData._jigyosyo_exists_koyou_sekininsha || false,
      _jigyosyo_is_use_kaigo_machine_subsidy:
        formData._jigyosyo_is_use_kaigo_machine_subsidy || false,
      _jigyosyo_is_use_other_subsidy:
        formData._jigyosyo_is_use_other_subsidy || false,
    };
    console.log("送信するデータ:", dataToSubmit);

    try {
      console.log("post mae", requestMethod);
      if (requestMethod === "post") {
        console.log("post", dataToSubmit);
        await axiosInstance.post(`jigyosyo-transaction/`, dataToSubmit);
      } else if (requestMethod === "put") {
        console.log("put", id, dataToSubmit);
        await axiosInstance.put(`jigyosyo-transaction/${id}/`, dataToSubmit);
      }

      setSnackbarMessage("送信に成功しました！");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/transaction/list");
    } catch (error) {
      console.error("送信エラー:", error);
      setSnackbarMessage("送信に失敗しました。");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

export default submitJigyosyoTransaction;
