import * as React from 'react';
import { Table, Tbody, Tr, Th, Thead } from '@chakra-ui/react';
import { SortedItemFields, ListItem } from 'types';
import { EditItemModal, DeleteModal } from 'components/modals';

import { sortList } from 'utils';
import { ItemTableRow, SortableColumnHeader } from '.';
import { useList, useModal } from 'hooks';
import { sortItems } from 'actions';

export const ItemTable: React.FC = () => {
  const [
    { items, sortedBy, sortingDirection, searchValue },
    dispatch,
  ] = useList();
  const [, setModalContext] = useModal();

  const openEditModal = (item: ListItem) =>
    setModalContext({
      isOpen: true,
      title: `${item.name} - edit`,
      content: <EditItemModal item={item} />,
    });

  const openDeleteModal = (item: ListItem) =>
    setModalContext({
      isOpen: true,
      title: `${item.name} - delete`,
      content: <DeleteModal item={item} />,
    });

  const setSortField = (field: SortedItemFields) => {
    dispatch(sortItems(field));
  };

  return (
    <>
      <Table variant="striped" size={'md'}>
        <Thead>
          <Tr>
            <Th></Th>
            <SortableColumnHeader
              field={SortedItemFields.name}
              onClick={setSortField}
              name="name"
              sortedBy={sortedBy}
              sortingDirection={sortingDirection}
            />
            <SortableColumnHeader
              field={SortedItemFields.ranking}
              onClick={setSortField}
              name="ranking"
              sortedBy={sortedBy}
              sortingDirection={sortingDirection}
            />
            <Th>Description</Th>
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortList(items, sortedBy, sortingDirection)
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue),
            )
            .map((item) => (
              <ItemTableRow
                key={item.id}
                item={item}
                onEdit={() => openEditModal(item)}
                onDelete={() => openDeleteModal(item)}
              />
            ))}
        </Tbody>
      </Table>
    </>
  );
};
