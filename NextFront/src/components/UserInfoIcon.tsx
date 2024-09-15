import { Avatar, Text, Group } from '@mantine/core';
import { IconUserCheck, IconAt } from '@tabler/icons-react';
import classes from './UserInfoIcon.module.css';

export function UserInfoIcons() {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Pseudo
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            Robert Glassbreaker
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              robert@glassbreaker.io
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconUserCheck stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              Premium Account
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}