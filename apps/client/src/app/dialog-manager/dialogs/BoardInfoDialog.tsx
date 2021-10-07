import { DialogProps } from 'dialog-manager-react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Board } from '@prisma/client';
import { useCopyToClipboard, useLocation } from 'react-use';

type BoardInfoDialogProps = {
  board: Board
} & DialogProps;

export default function BoardInfoDialog(props: BoardInfoDialogProps) {
  const { active, board, closeDialog } = props;
  const location = useLocation();
  const [, copy] = useCopyToClipboard();

  const inviteCode = `${location.origin}/invites/${board.inviteCode}`;

  const confirmDialog = () => {
    window.localStorage.setItem(`board-info-shown-${board.id}`, 'true')
    closeDialog();
  };


  return (
    <Modal isOpen={active} onClose={confirmDialog}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{board.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Invite users to your board using the link below.</p>
          <InputGroup size="md" mt="2">
            <Input
              pr="4.5rem"
              disabled={true}
              value={inviteCode}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => copy(inviteCode)}>
                Copy
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Flex alignItems="center" justifyContent="center">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => confirmDialog()}
            >
              Continue
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
