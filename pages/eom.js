import styles from '../styles/EOM.module.css';
import { ToolBar } from "../components/toolbar";

const EOM = ({ employee }) => {
    const empImage = "https://scontent.flos7-1.fna.fbcdn.net/v/t1.6435-9/178820836_2909002622752882_1851963117210312431_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFXra7JtjtFRq-ukabxULeO0HgZcUikEyHQeBlxSKQTIV0js-Fj8J-xzBvGvURTIrjdx3txOZlsfepJR02o6fb2&_nc_ohc=xpDbJYZnMnEAX9-y1Rl&_nc_ht=scontent.flos7-1.fna&oh=42780f8e077b471679f685454d01b34b&oe=60BBF2AE"
    return(
        <div className="page-container">

            <ToolBar />

            <div className={styles.main}>
                <h1>Employee of the month</h1>
                <div className={styles.employeeOfTheMonth}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.position}</h6>
                    <img src={empImage} />
                    <p>{employee.description}</p>
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps = async pageContext =>{
    const apiResponse = await fetch(
        'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth',
    );

    const employee = await apiResponse.json();

    return{
        props: {
            employee
        }
    }
};

export default EOM;