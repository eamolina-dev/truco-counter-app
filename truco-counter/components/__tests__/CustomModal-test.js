import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import CustomModal from '../CustomModal';

describe('CustomModal', () => {
  it('se renderiza cuando isVisible es true', () => {
    const { getByTestId } = render(
      <CustomModal isVisible={true} onBackdropPress={() => {}}>
        <TestChild />
      </CustomModal>
    );

    expect(getByTestId('custom-modal')).toBeTruthy();
  });

  it('no se renderiza cuando isVisible es false', () => {
    const { queryByTestId } = render(
      <CustomModal isVisible={false} onBackdropPress={() => {}}>
        <TestChild />
      </CustomModal>
    );

    expect(queryByTestId('custom-modal')).toBeNull();
  });

  it('llama a onBackdropPress al presionar el fondo', () => {
    const onBackdropPressMock = jest.fn();
    const { getByTestId } = render(
      <CustomModal isVisible={true} onBackdropPress={onBackdropPressMock}>
        <Text>Contenido del modal</Text>
      </CustomModal>
    );
  
    fireEvent.press(getByTestId('custom-modal'));
    expect(onBackdropPressMock).toHaveBeenCalledTimes(1);
  });  
});

const TestChild = () => <></>;
