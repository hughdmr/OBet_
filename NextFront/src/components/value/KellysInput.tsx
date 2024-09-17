import { NumberInput } from '@mantine/core';
import classes from './ValueInputs.module.css';

const InputKellyOdd: React.FC<{ setKellyOdd: (value: number) => void }> = ({ setKellyOdd }) => (
    <NumberInput
      label="Odd"
      description="Odd you want to calculate value"
      clampBehavior="strict"
      hideControls
      min={1}
      allowDecimal={true}
      stepHoldDelay={500}
      stepHoldInterval={100}
      onChange={(value) => setKellyOdd(value as number)}
      className={classes.inputKelly}
    />
  );
  
  const InputKellyFOdd: React.FC<{ setKellyFOdd: (value: number) => void }> = ({ setKellyFOdd }) => (
    <NumberInput
      label="Fair Odd"
      description="Fair Odd you want to compare with"
      clampBehavior="strict"
      hideControls
      min={1}
      allowDecimal={true}
      stepHoldDelay={500}
      stepHoldInterval={100}
      onChange={(value) => setKellyFOdd(value as number)}
      className={classes.inputKelly}
    />
  );

export {InputKellyFOdd, InputKellyOdd};