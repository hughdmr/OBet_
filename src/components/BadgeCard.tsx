"use client"

import Link from 'next/link';
import { useState } from 'react';
import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './BadgeCard.module.css';

type mockdatatype = {
    parent: string,
    image: string,
    title: string,
    description: string,
    country: string,
    badges: {
        emoji: string,
        label: string,
    },
    devise: string,
    link: string,
    label: string,
}

export function TemplateCard(mockdata: mockdatatype) {
    const {parent, image, title, description, country, badges, devise, link, label } = mockdata;
    const [active, setActive] = useState(parent);
    // const links = linksdata.map((item) => (
    const links =
        <Link
          className={classes.link}
          data-active={label === active || undefined}
          href={link}
          key={label}
          onClick={(event) => {
            setActive(label);
          }}>
          <span>{label}</span>
        </Link>
    //   ))
      ;
    const features = badges.map((badge) => (
      <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
        {badge.label}
      </Badge>
    ));
  
    return (
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image src={image} alt={title} height={180} />
        </Card.Section>
  
        <Card.Section className={classes.section_description} mt="md">
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {title}
            </Text>
            <Badge size="sm" variant="light">
              {country}
            </Badge>
          </Group>
          <Text fz="sm" mt="xs">
            {description}
          </Text>
        </Card.Section>
  
        <Card.Section className={classes.section_label}>
          <Text mt="md" className={classes.label} c="dimmed">
            {devise}
          </Text>
          <Group gap={7} mt={5}>
            {features}
          </Group>
        </Card.Section>
  
        <Group mt="xs">
          <Button radius="md" style={{ flex: 1 }}>
          {links}
        </Button>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconHeart className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card>
    );
  }

export function ValueCard() {
    const mockdata_value = {
        parent: 'Tool',
        image:
          'https://www.growthforce.com/hs-fs/hubfs/AdobeStock_513387732%20(1).jpeg?width=800&height=498&name=AdobeStock_513387732%20(1).jpeg',
        title: 'Value Calculator',
        country: 'Free',
        description:
          'This tool helps with the calcul of bet value, for a lot of type of bet. If you have a bet or boost that seems interesting for you, you write the odds you have on a serious bookmaker such as Pinnacle and it will gives you the fair odd (odd without marge). The tool will indicate you the value of your bet and will gives you an example of the stake you could bet following Kellys criteria.',
        badges: [
          { emoji: '🔢', label: 'Calculation' },
          { emoji: '🚀', label: 'Value' },
          { emoji: '💰', label: 'Money' },
        ],
        devise: 'The only principle to optibet and win.',
        link: '/tool/value', 
        label: 'Show details',
      };

  return (
    TemplateCard(mockdata_value)
  )
}

// 2e carte : optimisation de défis

export function SurebetCard() {
    const mockdata_surebet = {
        parent: 'Tool',
        image:
          'https://www.petitegravure.com/1325-large_default/couteau-suisse-victorinox-explorer-personnalise.webp',
        title: 'Surebet Calculator',
        country: 'Free',
        description:
          'This tool helps with the calcul of surebet, for a lot of type of surebet. It will helps you for the optimization of bookmaker challenge or for all type of surebet you want to do.',
        badges: [
          { emoji: '🔢', label: 'Calculation' },
          { emoji: '🛠️', label: 'Optimization' },
          { emoji: '💰', label: 'Money' },
        ],
        devise: 'The Swiss knife to optibet and win.',
        link: '/tool/surebet', 
        label: 'Show details',
      };

    return (
    TemplateCard(mockdata_surebet)
    )
}

// 3e carte : conversion de freebet

export function FreebetCard() {
    const mockdata_freebet = {
        parent: 'Tool',
        image:
          'https://images.freeimages.com/images/premium/previews/1566/15661718-money-exchange.jpg',
        title: 'Freebet Convertor',
        country: 'Premium',
        description:
          'This tool develops a method to convert your freebets, it leads and advices you for implement this method.',
        badges: [
          { emoji: '🔢', label: 'Calculation' },
          { emoji: '🔁', label: 'Exchange' },
          { emoji: '💰', label: 'Money' },
          { emoji: '🎁', label: 'Freebet' },
        ],
        devise: 'The essential to optibet and win.',
        link: 'tool/freebet',
        label: 'Show details',
      };

    return (
    TemplateCard(mockdata_freebet)
    )
}
