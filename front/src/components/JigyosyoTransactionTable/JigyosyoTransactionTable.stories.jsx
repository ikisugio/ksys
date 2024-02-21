import JigyosyoTransactionTable from "./JigyosyoTransactionTable";

export default {
  title: "components/JigyosyoTransactionTable",
  component: JigyosyoTransactionTable,
}

const Template = (args) => <JigyosyoTransactionTable {...args} />;
export const Default = Template.bind({});
Default.args = {jigyosyoCode: 1234}