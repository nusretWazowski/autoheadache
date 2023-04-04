import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ManagementNew from '../../components/settings/ManagementNew';
import ListItem from '../../components/shared/General/ListItem';
import NewMenuItem from '../../components/settings/NewMenuItem';

import { ModalRef } from '../../components/shared/UI/Modal';
import { MenuItem } from '../../util/types/menu';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { useMenu } from '../../util/hooks/useMenu';

const MenuManagement: React.FC = () => {
  const modalRef = React.useRef<ModalRef>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const { menu, setMenu } = useMenu();

  const newItemHandler = (item: MenuItem) => {
    setMenu((prevMenu) => prevMenu?.concat(item));
  };

  const removeMenuItemHandler = () => {};

  return (
    <ManagementNew
      ref={modalRef}
      modalContent={
        <NewMenuItem
          user={user!}
          forwardNewItem={newItemHandler}
          closeModal={() => modalRef.current?.setInvisible()}
        />
      }
    >
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.listItem}>
            <ListItem
              onRemove={removeMenuItemHandler}
              item={item}
              key={item.id}
            />
          </View>
        )}
      />
    </ManagementNew>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    paddingLeft: 25
  }
});

export default MenuManagement;
