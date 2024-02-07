import {
    MenuButtonBlockquote,
    MenuButtonBold,
    MenuButtonBulletedList, MenuButtonCode, MenuButtonCodeBlock,
    MenuButtonEditLink,
    MenuButtonItalic,
    MenuButtonOrderedList, MenuButtonRemoveFormatting,
    MenuButtonStrikethrough,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
} from "mui-tiptap";

export default function EditorControl() {
    return(
        <MenuControlsContainer>
            <MenuDivider />
            <MenuSelectHeading />
            <MenuDivider />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonStrikethrough />
            <MenuButtonEditLink/>
            <MenuDivider />
            <MenuButtonOrderedList />
            <MenuButtonBulletedList />
            <MenuDivider />
            <MenuButtonBlockquote />
            <MenuDivider />
            <MenuButtonCode />
            <MenuButtonCodeBlock />
            <MenuDivider />
            <MenuButtonRemoveFormatting />
        </MenuControlsContainer>
    )
}