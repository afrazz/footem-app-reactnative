/* eslint-disable react/prop-types */
import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper'
import Heading from '../Heading'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'

const Modal = ({
  visible,
  setVisible,
  header,
  children,
  actions,
  dismissable = true,
}) => {
  const theme = useTheme()
  const hideDialog = () => setVisible(false)

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          dismissable={dismissable}
          style={{ backgroundColor: theme.colors.secondaryBg }}
        >
          {header && <Dialog.Title>{header}</Dialog.Title>}

          <ScrollView showsVerticalScrollIndicator={false}>
            <Dialog.Content>{children}</Dialog.Content>
          </ScrollView>

          <Dialog.Actions
            style={{ paddingTop: spacing.sm, paddingBottom: spacing.sm }}
          >
            {actions}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default Modal
