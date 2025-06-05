export default function FormTitleComponent({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div>
      <div className="font-bold text-2xl text-center sm:text-left">{title}</div>
      <div className="text-muted-foreground text-center sm:text-left mt-1">
        {subTitle}
      </div>
    </div>
  );
}
