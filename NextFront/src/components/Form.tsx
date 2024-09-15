"use client";

import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, PasswordInput, Group } from '@mantine/core';

export function UserForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { pseudo:'', firstname: '', lastname: '', email: '', age: 0, password: 'secret',
      confirmPassword: 'sevret' },

    // functions will be used to validate values at corresponding key
    validate: {
      pseudo: (value) => (value.length < 5 ? 'Pseudo must have at least 5 letters' : null),
      firstname: (value) => (value.length < 2 ? 'Firstname must have at least 2 letters' : null),
      lastname: (value) => (value.length < 2 ? 'Lastname must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return (
    <div>
        <form onSubmit={form.onSubmit(console.log)}>
            <TextInput
                label="Pseudo"
                placeholder="Pseudo"
                withAsterisk
                key={form.key('pseudo')}
                {...form.getInputProps('pseudo')}
            />
            <TextInput
                label="First Name"
                placeholder="First Name"
                key={form.key('firstname')}
                {...form.getInputProps('firstname')}
            />
            <TextInput
                label="Last Name"
                placeholder="Last Name"
                key={form.key('lastname')}
                {...form.getInputProps('lastname')}
            />
            <TextInput
                mt="sm"
                label="Email"
                placeholder="Email"
                withAsterisk
                key={form.key('email')}
                {...form.getInputProps('email')}
            />
            <NumberInput
                mt="sm"
                label="Age"
                placeholder="Age"
                min={0}
                max={99}
                key={form.key('age')}
                {...form.getInputProps('age')}
            />
            <PasswordInput
                label="Password"
                placeholder="Password"
                key={form.key('password')}
                {...form.getInputProps('password')}
            />

            <PasswordInput
              mt="sm"
              label="Confirm password"
              placeholder="Confirm password"
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" mt="sm">
                  Submit
              </Button>
            </Group>
        </form>
    </div>
  );
}