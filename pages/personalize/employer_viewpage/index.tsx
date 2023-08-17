import { PersonalizedMenu } from "../components/personalizedMenu";
import Button  from "../../../components/Button";

export default function EmployerViewPage() {

    return (
        <>
        <PersonalizedMenu role="employer" />
        <Button loading={false}>Sectors</Button>
        <Button loading={false}>Skills</Button>
        <Button loading={false}>Experiences</Button>
        </>
    )
}