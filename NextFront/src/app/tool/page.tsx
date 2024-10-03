import { ValueCard, SurebetCard, FreebetCard } from '../../components/BadgeCard';
import classes from '../../components/BadgeCard.module.css';

export default function Home() {
    return (
      <div>
        <h1>Betting Tools</h1>
        <div className={classes.container}>
            <ValueCard/>
            <SurebetCard/>
            <FreebetCard/>
      </div>
    </div>
    );
  }