/* eslint-disable react/jsx-no-bind */
import { ArrowRightIcon } from "@sanity/icons";
import { Flex, Inline, MenuButton, Button, Menu, MenuItem } from "@sanity/ui";
import { HeaderButtonsProps } from "../types";

const HeaderButtons = (props: HeaderButtonsProps) => {
  return (
    <Flex>
      <Inline space={2}>
        {props.showTriggerDeployButton && (
          <MenuButton
            button={<Button text="Trigger Deploy" />}
            id="menu-button-example"
            menu={
              <Menu>
                <MenuItem
                  text="Deploy site"
                  onClick={() => props.onTriggerBuild()}
                />
                <MenuItem
                  text="Clear cache and deploy site"
                  onClick={() => props.onTriggerBuild(true)}
                />
              </Menu>
            }
          />
        )}
        <Button text="Logout" onClick={props.onLogout} icon={ArrowRightIcon} />
      </Inline>
    </Flex>
  );
};

export default HeaderButtons;
