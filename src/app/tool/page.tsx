import { ValueCard, SurebetCard } from '../../components/BadgeCard';
import classes from '../../components/BadgeCard.module.css';

export default function Home() {
    return (
      <div className={classes.container}>
        <ValueCard/>
        <SurebetCard/>
    </div>
    );
  }