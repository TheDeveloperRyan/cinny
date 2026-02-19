import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  IconButton,
  Icon,
  Icons,
  Scroll,
  Input,
  toRem,
  Tooltip,
  TooltipProvider,
} from 'folds';
import { Page, PageHeader, PageContent } from '../../../components/page';
import { useSetting } from '../../../state/hooks/settings';
import { settingsAtom, Settings, defaultSettings } from '../../../state/settings';
import { SettingTile } from '../../../components/setting-tile';
import { SequenceCard } from '../../../components/sequence-card';
import { CompactSequenceCardStyle } from '../styles.css';

function KeybindInput({ keybindEvent }: { keybindEvent: keyof Settings['keybinds'] }) {
  const [keyBinds, setKeybinds] = useSetting(settingsAtom, 'keybinds');
  const [currentKeybind, setCurrentKeybind] = useState(keyBinds[keybindEvent]);

  useEffect(() => {
    setCurrentKeybind(keyBinds[keybindEvent]);
  }, [keyBinds, keybindEvent]);

  const formatKeybind = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keys = [];

    const shiftSymbols = new Set([
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '_',
      '+',
      '{',
      '}',
      '|',
      ':',
      '"',
      '<',
      '>',
      '?',
      '~',
    ]);

    const isShiftSymbol = shiftSymbols.has(e.key);

    if (e.ctrlKey) keys.push('Ctrl');
    if (e.altKey) keys.push('Alt');

    // Only include shift if not in shift symbols, since those already imply shift
    if (e.shiftKey && !isShiftSymbol) keys.push('Shift');
    if (e.metaKey) keys.push('Meta');

    const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
    if (!['Control', 'Alt', 'Shift', 'Meta'].includes(key)) {
      keys.push(key);
    }

    return keys;
  };

  const resetToDefault = () => {
    const defaultKeybind = defaultSettings.keybinds[keybindEvent];
    setCurrentKeybind(defaultKeybind);
    setKeybinds((prev) => ({ ...prev, [keybindEvent]: defaultKeybind }));
  };

  return (
    <Input
      style={{ width: toRem(200) }}
      type="text"
      value={currentKeybind.join('+')}
      placeholder="Type a combination"
      readOnly
      onKeyDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyUp={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const formattedKeybind = formatKeybind(e);
        if (formattedKeybind.length > 0) {
          setCurrentKeybind(formattedKeybind);
          setKeybinds((prev) => ({ ...prev, [keybindEvent]: formattedKeybind }));
          (e.target as HTMLInputElement).blur();
        }
      }}
      onFocus={() => setCurrentKeybind([])}
      after={
        <TooltipProvider
          tooltip={
            <Tooltip variant="Surface">
              <Text>Reset to default</Text>
            </Tooltip>
          }
          position="Top"
        >
          {(anchorRef) => (
            <IconButton
              ref={anchorRef}
              onClick={resetToDefault}
              variant="Surface"
              size="300"
              style={{ marginRight: toRem(-8) }}
            >
              <Icon src={Icons.Reload} /> {/* TODO: Replace with a reset icon */}
            </IconButton>
          )}
        </TooltipProvider>
      }
    />
  );
}

type KeybindsProps = {
  requestClose: () => void;
};
export function Keybinds({ requestClose }: KeybindsProps) {
  return (
    <Page>
      <PageHeader outlined={false}>
        <Box grow="Yes" gap="200">
          <Box grow="Yes" alignItems="Center" gap="200">
            <Text size="H3" truncate>
              Keybinds
            </Text>
          </Box>
          <Box shrink="No">
            <IconButton onClick={requestClose} variant="Surface">
              <Icon src={Icons.Cross} />
            </IconButton>
          </Box>
        </Box>
      </PageHeader>
      <Box grow="Yes">
        <Scroll hideTrack visibility="Hover">
          <PageContent>
            <Box direction="Column" gap="400">
              <Box direction="Column" gap="100">
                <Text size="L400">Space & Room Navigation</Text>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Navigate Up A Space"
                    after={<KeybindInput keybindEvent="NavigateSpaceUp" />}
                  />
                </SequenceCard>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Navigate Down A Space"
                    after={<KeybindInput keybindEvent="NavigateSpaceDown" />}
                  />
                </SequenceCard>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Navigate Up A Room"
                    after={<KeybindInput keybindEvent="NavigateRoomUp" />}
                  />
                </SequenceCard>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Navigate Down A Room"
                    after={<KeybindInput keybindEvent="NavigateRoomDown" />}
                  />
                </SequenceCard>
              </Box>
              <Box direction="Column" gap="100">
                <Text size="L400">Timeline Navigation</Text>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Move Timeline Highlight Up"
                    after={<KeybindInput keybindEvent="TimelineHighlightUp" />}
                  />
                </SequenceCard>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Move Timeline Highlight Down"
                    after={<KeybindInput keybindEvent="TimelineHighlightDown" />}
                  />
                </SequenceCard>
              </Box>
              <Box direction="Column" gap="100">
                <Text size="L400">Message Actions</Text>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Reply to Highlighted Message"
                    after={<KeybindInput keybindEvent="TimelineHighlightReply" />}
                  />
                </SequenceCard>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="React to Highlighted Message"
                    after={<KeybindInput keybindEvent="TimelineHighlightReact" />}
                  />
                </SequenceCard>
                <SequenceCard
                  className={CompactSequenceCardStyle}
                  variant="SurfaceVariant"
                  direction="Column"
                >
                  <SettingTile
                    title="Delete Highlighted Message"
                    after={<KeybindInput keybindEvent="TimelineHighlightDelete" />}
                  />
                </SequenceCard>
              </Box>
            </Box>
          </PageContent>
        </Scroll>
      </Box>
    </Page>
  );
}
