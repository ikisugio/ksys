import { useState } from "react";
import axiosInstance from "@/services/axios";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  TRANSACTION_FIELDS,
  AUXILIARY_FIELDS,
} from "@/constants/transaction-fields";
import CustomDropdown from "../components/CustomDropdown";
import { useNavigate } from "react-router-dom";
import CustomTextField from "@/components/CustomTextField";

const initialFormData = {
  is_recruiting_on_hw: false,
  is_recruiting_on_expect_hw: false,
  is_going_to_recruit: false,
  is_accepting_intern: false,
  will_inform_hw: false,
  will_inform_prefecture: false,
  will_inform_others: false,
  done_explain_support: false,
  done_knowing_problem: false,
  with_tool_utilization: false,
  with_employment_consultant: false,
  with_health_counselor: false,
  with_training_coordinator: false,
  with_alone_on_hw: false,
  with_staff_on_hw: false,
  koyou_job_posting_consult: false,
  koyou_job_posting_inform: false,
  koyou_working_conditions_consult: false,
  koyou_working_conditions_inform: false,
  koyou_welfare_benefits_consult: false,
  koyou_welfare_benefits_inform: false,
  koyou_workplace_communication_consult: false,
  koyou_workplace_communication_inform: false,
  koyou_subsidies_consult: false,
  koyou_subsidies_inform: false,
  koyou_care_services_consult: false,
  koyou_care_services_inform: false,
  koyou_workplace_environment_consult: false,
  koyou_workplace_environment_inform: false,
  koyou_skill_development_consult: false,
  koyou_skill_development_inform: false,
  koyou_employment_management_responsibility_consult: false,
  koyou_employment_management_responsibility_inform: false,
  koyou_other_consult: false,
  koyou_other_inform: false,
  noukai_qualification_system_training_consult: false,
  noukai_qualification_system_training_inform: false,
  noukai_job_posting_consult: false,
  noukai_job_posting_inform: false,
  noukai_training_plan_curriculum_consult: false,
  noukai_training_plan_curriculum_inform: false,
  noukai_subsidy_system_for_skill_development_consult: false,
  noukai_subsidy_system_for_skill_development_inform: false,
  noukai_vocational_skill_development_promoter_consult: false,
  noukai_vocational_skill_development_promoter_inform: false,
  noukai_other_skill_development_consult: false,
  noukai_other_skill_development_inform: false,
  _management_is_sanjo: false,
  _jigyosyo_exists_koyou_sekininsha: false,
  _jigyosyo_is_use_kaigo_machine_subsidy: false,
  _jigyosyo_is_use_other_subsidy: false
};

function JigyosyoTransactionForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [searchCode, setSearchCode] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const navigate = useNavigate();
  const theme = useTheme();
  const MINIMUM_VISIT_MEMO_LINES = 3;

  const handleSearch = async (e) => {
    const jigyosyoCode = formData["_jigyosyo_code"];
    const jigyosyoName = formData["_jigyosyo_name"];
    const jigyosyoAddress = formData["_jigyosyo_address"];
    console.log("jigyosyocode : ", jigyosyoCode);
    console.log("e is =>", jigyosyoCode);
    const query = jigyosyoCode || jigyosyoName || jigyosyoAddress;
    console.log("query is", query);

    try {
      const response = await axiosInstance.get(
        `http://localhost:8000/api/search/jigyosyo/?q=${query}`
      );
      console.log("responsedata =>", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("APIからデータを取得中にエラーが発生しました:", error);
    }
  };

  const handleSearchResultSelect = (selected) => {
    let updatedFormData = { ...formData };
    console.log("updateFormData:", updatedFormData);
    console.log("selected:", selected);

    updatedFormData["_jigyosyo_code"] = selected.jigyosyo_code;
    updatedFormData["_jigyosyo_custom_code"] = selected.custom_code;
    updatedFormData["_jigyosyo_name"] = selected.name;
    updatedFormData["_jigyosyo_postal_code"] = selected.postal_code;
    updatedFormData["_jigyosyo_address"] = selected.address;
    updatedFormData["_jigyosyo_tel_number"] = selected.tel_number;
    updatedFormData["_jigyosyo_fax_number"] = selected.fax_number;
    updatedFormData["_jigyosyo_repr_name"] = selected.repr_name;
    updatedFormData["_jigyosyo_repr_position"] = selected.repr_position;
    updatedFormData["_jigyosyo_kourou_url"] = selected.kourou_jigyosyo_url;
    updatedFormData["_jigyosyo_kourou_release_datetime"] =
      selected.kourou_release_datetime;

    if (selected.company) {
      updatedFormData["companyName"] = selected.company.name;
      updatedFormData["companyPostalCode"] = selected.company.postal_code;
    }

    setFormData(updatedFormData);
    setSearchResults([]);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "visit_memo") {
      const lineCount = value.split("\n").length;
      const minRows = MINIMUM_VISIT_MEMO_LINES;
      newFormData = {
        ...newFormData,
        visit_memo_rows: lineCount > minRows ? lineCount : minRows,
      };
    }

    setFormData(newFormData);
  };

  const createInputField = (field) => {
    if (field.name === "_jigyosyo_code") {
      return (
        <div key={field.name} style={{ position: "relative" }}>
          <CustomTextField
            field={field}
            formData={formData}
            handleChange={handleChange}
          />
          <CustomDropdown
            options={searchResults}
            onSelect={(selected) => {
              handleSearchResultSelect(selected);
              setSearchResults([]);
            }}
            isOpen={searchResults.length > 0}
            setIsOpen={(isOpen) =>
              setSearchResults(isOpen ? searchResults : [])
            }
          />
        </div>
      );
    }
    if (field.name === "jigyosyo_custom_code") {
      return (
        <TextField
          key={field.name}
          name={field.name}
          label="事業所独自コード"
          type="text"
          value={formData[field.name] || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      );
    }
    switch (field.type) {
      case "text":
        if (field.name === "visit_memo") {
          return (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={formData.visit_memo_rows || MINIMUM_VISIT_MEMO_LINES}
            />
          );
        }
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        );
      case "file":
        return (
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            key={field.name}
            style={{ border: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Button
                variant="contained"
                component="label"
                style={{ marginRight: "1em" }}
              >
                ファイルを選択
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: field.name,
                        value: e.target.files[0]?.name || "",
                      },
                    })
                  }
                />
              </Button>
              <div style={{ color: "gray" }}>
                {formData[field.name] || "ファイルは選択されていません"}
              </div>
            </div>
          </FormControl>
        );
      case "date":
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type="date"
            value={formData[field.name] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                format: "yyyy-MM-dd",
              },
            }}
          />
        );
      case "select":
        return (
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            key={field.name}
          >
            <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              label={field.label}
            >
              {field.options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                name={field.name}
                checked={!!formData[field.name]}
                onChange={handleChange}
              />
            }
            label={field.label}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      _jigyosyo_code: formData._jigyosyo_code,
      _jigyosyo_name: formData._jigyosyo_name,
      _jigyosyo_postal_code: formData._jigyosyo_postal_code,
      _jigyosyo_address: formData._jigyosyo_address,
      _jigyosyo_tel_number: formData._jigyosyo_tel_number,
      _jigyosyo_fax_number: formData._jigyosyo_fax_number,
      _jigyosyo_repr_name: formData._jigyosyo_repr_name,
      _jigyosyo_repr_position: formData._jigyosyo_repr_position,
      _jigyosyo_kourou_url: formData._jigyosyo_kourou_url,
      _jigyosyo_kourou_release_datetime: formData._jigyosyo_kourou_release_datetime,
      // management: formData.management || null,
      visit_date: formData.visit_date || null,
      visit_memo: formData.visit_memo || null,
      file: formData.file || null,
      history: formData.history || null,
      keikei_kubun: formData.keikei_kubun || null,
      support_status: formData.support_status || null,
      support_means: formData.support_means || null,
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
      koyou_workplace_environment_consult:
        formData.koyou_workplace_environment_consult || false,
      koyou_workplace_environment_inform:
        formData.koyou_workplace_environment_inform || false,
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
      _management_is_sanjo: formData._management_is_sanjo || false,
      _management_description: formData._management_description || null,
      _jigyosyo_type: formData._jigyosyo_type || null,
      _jigyosyo_postal_code: formData._jigyosyo_postal_code || null,
      _jigyosyo_address: formData._jigyosyo_address || null,
      _jigyosyo_tel_number: formData._jigyosyo_tel_number || null,
      _jigyosyo_fax_number: formData._jigyosyo_fax_number || null,
      _jigyosyo_repr_name: formData._jigyosyo_repr_name || null,
      _jigyosyo_repr_position: formData._jigyosyo_repr_position || null,
      _jigyosyo_kourou_url: formData._jigyosyo_kourou_url || null,
      _jigyosyo_kourou_release_datetime:
        formData._jigyosyo_kourou_release_datetime || null,
      _jigyosyo_number_of_member: formData._jigyosyo_number_of_member || null,
      _jigyosyo_exists_koyou_sekininsha:
        formData._jigyosyo_exists_koyou_sekininsha || false,
      _jigyosyo_is_use_kaigo_machine_subsidy:
        formData._jigyosyo_is_use_kaigo_machine_subsidy || false,
      _jigyosyo_is_use_other_subsidy:
        formData._jigyosyo_is_use_other_subsidy || false,
    };
    console.log('送信するデータ:', dataToSubmit);

    try {
      const response = await axiosInstance.post(
        "jigyosyo-transaction/",
        dataToSubmit
      );
      // 送信成功時の処理
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

  const visitMemoField = TRANSACTION_FIELDS.find(
    (field) => field.name === "visit_memo"
  );
  const fileField = TRANSACTION_FIELDS.find((field) => field.type === "file");
  const fieldsWithoutVisitMemoAndFile = TRANSACTION_FIELDS.filter(
    (field) => field.name !== "visit_memo" && field.type !== "file"
  );
  const orderedFields = [
    ...fieldsWithoutVisitMemoAndFile,
    fileField,
    visitMemoField,
  ];

  const normalFields = orderedFields.filter(
    (field) => field.type !== "checkbox" && field.name !== "visit_memo"
  );
  const checkboxFields = orderedFields.filter(
    (field) => field.type === "checkbox"
  );

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          justifyContent="space-around"
          style={{
            height: "80vh",
            overflow: "hidden",
            marginLeft: "0",
            marginBottom: "4em",
            paddingBottom: "1em",
            borderBottom: "1px solid lightgrey",
          }}
        >
          {/* 左カラム */}
          <Grid
            item
            xs={5}
            style={{
              padding: "0 3em",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              direction: "rtl",
              borderRight: "2px solid lightgrey",
            }}
          >
            <div style={{ direction: "ltr" }}>
              {" "}
              {/* 内容は LTR 方向性 */}
              {AUXILIARY_FIELDS.filter((field) => field.isDisplay).map(
                createInputField
              )}
            </div>
          </Grid>

          {/* 右カラム */}
          <Grid
            item
            xs={7}
            style={{ padding: "0 3em", height: "100%", overflow: "auto" }}
          >
            <Grid container spacing={2}>
              {/* 通常の入力フィールドを2つのサブカラムに分割 */}
              <Grid item xs={6}>
                {normalFields
                  .filter((_, index) => index % 2 === 0)
                  .map(createInputField)}
              </Grid>
              <Grid item xs={6}>
                {normalFields
                  .filter((_, index) => index % 2 !== 0)
                  .map(createInputField)}
              </Grid>

              {/* チェックボックスフィールド */}
              <Grid
                container
                spacing={1}
                justifyContent="flex-end"
                style={{ paddingTop: "1.5em", paddingBottom: "1em" }}
              >
                <Grid item xs={5.8}>
                  {checkboxFields
                    .filter((_, index) => index % 2 === 0)
                    .map(createInputField)}
                </Grid>
                <Grid item xs={5.8}>
                  {checkboxFields
                    .filter((_, index) => index % 2 !== 0)
                    .map(createInputField)}
                </Grid>
              </Grid>
            </Grid>

            {/* visit_memo フィールド */}
            {createInputField(visitMemoField)}
          </Grid>
        </Grid>

        <div
          style={{
            position: "absolute",
            bottom: 15,
            left: 0, // 左端に配置
            right: 0, // 右端に配置
            display: "flex",
            justifyContent: "space-between", // 左右にボタンを寄せる
            alignItems: "center",
            padding: "0 50px", // 左右に余白を設定
          }}
        >
          {/* 検索ボタン */}
          <Button variant="contained" color="primary" onClick={handleSearch}>
            検索
          </Button>

          {/* 保存ボタン */}
          <IconButton
            type="submit"
            color="primary"
            style={{
              borderRadius: "5%",
              backgroundColor: theme.palette.primary.main,
              fontSize: "large",
            }}
          >
            <span style={{ padding: "0 0.2em", color: "white" }}>保存</span>
            <SaveIcon style={{ paddingRight: "0.1em", color: "white" }} />
          </IconButton>
        </div>
      </form>
    </div>
  );
}
export default JigyosyoTransactionForm;
