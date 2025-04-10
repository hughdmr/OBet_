import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Hugues Hardemare
          </Text>

          <Text c="dimmed" size="xs">
            ougo.hardemare@gmail.com
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}