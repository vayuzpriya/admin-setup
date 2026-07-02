import Button from "../components/button";
import Input from "../components/input";
import Card from "../components/glassCard";
import Typography from "../components/typography";
import Loader from "../components/loader";
export const componentRegistry = {
    button: {
        title: "Button",
        preview: (
  <div className="space-y-8">

    <div>
      <h3 className="mb-4 text-xl font-semibold text-white">
        Button Variants
      </h3>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>

    <div>
      <h3 className="mb-4 text-xl font-semibold text-white">
        Button Sizes
      </h3>

      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>

    <div>
      <h3 className="mb-4 text-xl font-semibold text-white">
        Disabled
      </h3>

      <div className="flex gap-4">
        <Button disabled>Primary</Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
      </div>
    </div>

    <div>
      <h3 className="mb-4 text-xl font-semibold text-white">
        Full Width
      </h3>

      <Button className="w-full">
        Full Width Button
      </Button>
    </div>

  </div>
),
        code: `<Button>Primary</Button>`
    },

    input: {
        title: "Input",
       preview: (
  <div className="space-y-10">

    {/* Basic Inputs */}
    <div>
      <h3 className="mb-5 text-xl font-semibold text-white">
        Basic Inputs
      </h3>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Text"
          placeholder="Enter your name"
        />

        <Input
          type="email"
          label="Email"
          placeholder="john@example.com"
        />

        <Input
          type="password"
          label="Password"
          placeholder="••••••••"
        />

        <Input
          type="number"
          label="Number"
          placeholder="25"
        />

        <Input
          type="date"
          label="Date"
        />

        <Input
          type="time"
          label="Time"
        />
      </div>
    </div>

    {/* Other Types */}
    <div>
      <h3 className="mb-5 text-xl font-semibold text-white">
        Other Input Types
      </h3>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          type="search"
          label="Search"
          placeholder="Search..."
        />

        <Input
          type="tel"
          label="Phone"
          placeholder="+91 9876543210"
        />

        <Input
          type="url"
          label="Website"
          placeholder="https://example.com"
        />

        <Input
          type="color"
          label="Color Picker"
        />
      </div>
    </div>

    {/* States */}
    <div>
      <h3 className="mb-5 text-xl font-semibold text-white">
        Input States
      </h3>

      <div className="grid gap-5 md:grid-cols-2">

        <Input
          label="Required"
          required
          placeholder="Required field"
        />

        <Input
          label="Disabled"
          disabled
          placeholder="Disabled input"
        />

        <Input
          label="Error"
          error="Email is required"
          placeholder="Enter email"
        />
        <Input
  label="Success"
  success="Looks good! Your email is valid."
  placeholder="john@example.com"
/>

      </div>
    </div>

  </div>
),
        code: `<Input placeholder="Enter name" />`
    },

      card: {
    title: "Card",
    preview: (
  <div className="space-y-12">

    {/* Card Variants */}
    <div>
      <h3 className="mb-6 text-xl font-semibold text-white">
        Card Variants
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <Card variant="glass">
          <h3 className="text-lg font-bold text-white">
            Glass Card
          </h3>

          <p className="mt-3 text-slate-300">
            Frosted glass background with blur.
          </p>
        </Card>

        <Card variant="solid">
          <h3 className="text-lg font-bold text-white">
            Solid Card
          </h3>

          <p className="mt-3 text-slate-300">
            Dark solid background.
          </p>
        </Card>

        <Card variant="outline">
          <h3 className="text-lg font-bold text-white">
            Outline Card
          </h3>

          <p className="mt-3 text-slate-300">
            Transparent with border.
          </p>
        </Card>

        <Card variant="gradient">
          <h3 className="text-lg font-bold text-white">
            Gradient Card
          </h3>

          <p className="mt-3 text-slate-300">
            Gradient premium style.
          </p>
        </Card>

      </div>
    </div>

    {/* Feature Card */}
    <div>
      <h3 className="mb-6 text-xl font-semibold text-white">
        Feature Card
      </h3>

      <Card className="max-w-md">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl">
          🚀
        </div>

        <h2 className="text-2xl font-bold text-white">
          Lightning Fast
        </h2>

        <p className="mt-3 text-slate-300">
          Build modern applications using reusable UI components.
        </p>

        <Button className="mt-6">
          Learn More
        </Button>
      </Card>
    </div>

    {/* Profile Card */}
    <div>
      <h3 className="mb-6 text-xl font-semibold text-white">
        Profile Card
      </h3>

      <Card className="max-w-sm text-center">

        <img
          src="https://i.pravatar.cc/150?img=12"
          alt=""
          className="mx-auto h-24 w-24 rounded-full"
        />

        <h2 className="mt-4 text-xl font-bold text-white">
          John Doe
        </h2>

        <p className="text-slate-400">
          Frontend Developer
        </p>

        <Button className="mt-6">
          Follow
        </Button>

      </Card>
    </div>

    {/* Stats Card */}
    <div>
      <h3 className="mb-6 text-xl font-semibold text-white">
        Stats Card
      </h3>

      <div className="grid gap-6 md:grid-cols-4">

        <Card>
          <p className="text-slate-400">
            Users
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            18K
          </h2>
        </Card>

        <Card>
          <p className="text-slate-400">
            Revenue
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            $45K
          </h2>
        </Card>

        <Card>
          <p className="text-slate-400">
            Orders
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            950
          </h2>
        </Card>

        <Card>
          <p className="text-slate-400">
            Growth
          </p>

          <h2 className="mt-2 text-4xl font-bold text-emerald-400">
            +23%
          </h2>
        </Card>

      </div>
    </div>

    {/* Pricing Card */}
    <div>
      <h3 className="mb-6 text-xl font-semibold text-white">
        Pricing Card
      </h3>

      <Card className="max-w-sm">

        <h2 className="text-3xl font-bold text-white">
          Pro Plan
        </h2>

        <p className="mt-2 text-slate-400">
          For professionals
        </p>

        <h1 className="mt-8 text-5xl font-bold text-violet-400">
          $29
          <span className="text-lg text-slate-400">
            /month
          </span>
        </h1>

        <ul className="mt-8 space-y-3 text-slate-300">
          <li>✔ Unlimited Projects</li>
          <li>✔ Team Collaboration</li>
          <li>✔ Priority Support</li>
        </ul>

        <Button className="mt-8">
          Get Started
        </Button>

      </Card>
    </div>

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