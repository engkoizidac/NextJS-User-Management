import FormTitleComponent from "../components/form-title";

export default function ProductPage() {
  return (
    <div>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <FormTitleComponent
          title="Products"
          subTitle="Manage company products."
        />
      </div>
    </div>
  );
}
