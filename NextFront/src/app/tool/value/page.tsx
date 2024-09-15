import { InputIssuesNumber, InputBetNumber, InputOperationType } from '../../../components/ValueInputs';
import { TableInput } from '../../../components/TableInput';
import classes from '../../../components/ValueInputs.module.css';

export default function Home() {
    return (
      <div className={classes.container}>
        <InputBetNumber/>
        <InputIssuesNumber/>
        <TableInput/>
        <InputOperationType/>
    </div>
    );
  }