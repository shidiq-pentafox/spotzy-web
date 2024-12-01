import { useState, useEffect } from 'react';
import { Combobox, InputBase, useCombobox, ComboboxProps } from '@mantine/core';

interface DataItem {
  label: string;
  value: string | number;
}

interface SelectCreatableProps extends Omit<ComboboxProps, 'children'> {
  onCreateOption: (newValue: string) => void;
  onChange: (value: string | null) => void;
  value: string | null;
  data: DataItem[];
  placeholder?: string;
  label?: string;
  error?: string;
}

export function SelectCreatable({
  onCreateOption,
  onChange,
  value,
  data = [],
  placeholder = 'Search value',
  label,
  error,
  ...comboboxProps
}: SelectCreatableProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState(value || '');

  useEffect(() => {
    setSearch(value || '');
  }, [value]);

  const exactOptionMatch = data.some((item) => item.label === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.value.toString()} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      radius="md"
      onOptionSubmit={(val) => {
        if (val === '$create') {
          onCreateOption(search);
        } else {
          const selectedItem = data.find(item => item.value.toString() === val);
          onChange(selectedItem ? selectedItem.label : null);
          setSearch(selectedItem ? selectedItem.label : '');
        }
        combobox.closeDropdown();
      }}
      {...comboboxProps}
    >
      {label && <Combobox.Label>{label}</Combobox.Label>}
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          radius="md"
          value={search}
          onChange={(event) => {
            const newValue = event.currentTarget.value;
            setSearch(newValue);
            onChange(newValue);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
          }}
          placeholder={placeholder}
          rightSectionPointerEvents="none"
          error={error}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
