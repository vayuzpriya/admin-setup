import Card from "../components/ui/Card";

function Preview({
    title,
    component,
    code,
}) {

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold text-white">
                {title}
            </h1>

            <Card title="Live Preview">

                <div className="flex justify-center py-10">

                    {component}

                </div>

            </Card>

            <Card title="Code">

                <pre>

                    {code}

                </pre>

            </Card>

        </div>

    );

}

export default Preview;