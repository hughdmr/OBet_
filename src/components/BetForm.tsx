"use client";

import { Flex, TextInput, Group, Button, NativeSelect } from '@mantine/core';
import { useForm } from '@mantine/form';

export function BetForm() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          date: '',
          team1: '',
          team2: '',
          amount: '',
          cote: '',
          status: '',
        },
        validate: {},
      });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
                <TextInput
                    label="Date"
                    placeholder="2022-12-06"
                    key={form.key('date')}
                    {...form.getInputProps('date')}
                />

                <TextInput
                    label="Team1"
                    placeholder="PSG"
                    key={form.key('team1')}
                    {...form.getInputProps('team1')}
                />

                <TextInput
                    label="Team2"
                    placeholder="OM"
                    key={form.key('team2')}
                    {...form.getInputProps('team2')}
                />

                <TextInput
                    label="Amount"
                    placeholder="45€"
                    key={form.key('amount')}
                    {...form.getInputProps('amount')}
                />

                <TextInput
                    label="cote"
                    placeholder="2.45"
                    key={form.key('cote')}
                    {...form.getInputProps('cote')}
                />

                <NativeSelect
                    label="Input label"
                    data={['pending', 'won', 'lost']} 
                    {...form.getInputProps('status')} 
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </Flex>
        </form>
    );
}