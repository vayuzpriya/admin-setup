import Button from "../components/button";
import Input from "../components/input";
import Card from "../components/glassCard";
import Typography from "../components/typography";
import Loader from "../components/loader";
export const componentRegistry = {
    button: {
        title: "Button",
        preview: <Button>Primary</Button>,
        code: `<Button>Primary</Button>`
    },

    input: {
        title: "Input",
        preview: <Input placeholder="Enter name" />,
        code: `<Input placeholder="Enter name" />`
    },

      card: {
    title: "Card",
    preview: (
        <div className="grid grid-cols-3 gap-6">
  {Array.from({ length: 5 }).map((_, index) => (
    <Card key={index} className="max-w-md">
      <h2 className="text-xl font-bold text-white">
        .............
      </h2>

      <p className="mt-3 text-slate-300">
        ...................
      </p>

      <Button className="mt-6" fullWidth={false}>
        ..............
      </Button>
    </Card>
  ))}
</div>
    ),
    code: `<Card className="max-w-md">
  

</Card>`,
  },
loader: {
  title: "Loader",

  preview: (
    <div className="space-y-10">

      {/* Sizes */}
      <div>
        <h3 className="mb-6 text-xl font-semibold text-white">
          Loader Sizes
        </h3>

        <div className="flex items-center gap-10">
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="mb-6 text-xl font-semibold text-white">
          Loader Colors
        </h3>

        <div className="flex items-center gap-10">
          <Loader color="violet" />
          <Loader color="cyan" />
          <Loader color="green" />
          <Loader color="red" />
          <Loader color="white" />
        </div>
      </div>

    </div>
  ),

  code: `<Loader
  size="md"
  color="violet"
/>`,
},
  text: {
  title: "Typography",

  preview: (
    <div className="space-y-6">

      <Typography variant="h1">
        Heading 1
      </Typography>

      <Typography variant="h2">
        Heading 2
      </Typography>

      <Typography variant="h3">
        Heading 3
      </Typography>

      <Typography variant="h4">
        Heading 4
      </Typography>

      <Typography variant="bodyLg">
        Large paragraph text.
      </Typography>

      <Typography>
        Default body text.
      </Typography>

      <Typography variant="small">
        Small helper text.
      </Typography>

      <Typography variant="caption">
        Caption Text
      </Typography>

      <div className="flex gap-6">

        <Typography variant="success">
          Success
        </Typography>

        <Typography variant="error">
          Error
        </Typography>

        <Typography variant="warning">
          Warning
        </Typography>

        <Typography variant="info">
          Info
        </Typography>

        <Typography variant="primary">
          Primary
        </Typography>

      </div>

    </div>
  ),

  code: `<Typography variant="h1">
    Heading 1
</Typography>`,
},
};