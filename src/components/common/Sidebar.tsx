import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Dashboard,
  PeopleAlt,
  Business,
  LocalMall,
  SupervisedUserCircle,
  Group,
  Person,
  Autorenew,
  MonetizationOn,
  TrendingUp,
} from "@mui/icons-material";

import "./Layout.scss";

const Sidebar: React.FC = () => {
  const [userRole, setUserRole] = useState<number[]>([]);
  const [userType, setUserType] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const rolarr = localStorage.getItem("userRole");
    const userType = localStorage.getItem("userType")
    if(userType !== null){
      setUserType(userType)
    }
    if (rolarr !== null) {
      const parsedRolarr = JSON.parse(rolarr);
      setUserRole(parsedRolarr);
    }
  }, []);

  const handleMenuItemClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  return (
    <div>
      <Divider />
      <List>
        {userRole.includes(1) && (
          <ListItem
            className={selectedItem === "dashboard" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("dashboard")}
          >
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        )}
        {(userRole.includes(2) || userType === "Nbfc") && (
          <ListItem
            className={selectedItem === "collection" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("collection")}
          >
            <ListItemButton component={Link} to="/collection">
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Collection" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(16) && (
          <ListItem
            className={selectedItem === "role" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("role")}
          >
            <ListItemButton component={Link} to="/role">
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Role Management" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(3) && (
          <ListItem
            className={selectedItem === "product" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("product")}
          >
            <ListItemButton component={Link} to="/product">
              <ListItemIcon>
                <LocalMall />
              </ListItemIcon>
              <ListItemText primary="Product Management" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      {userRole.includes(2) && (
        <ListItem
          className={selectedItem === "QueUser" ? "highlighted" : ""}
          onClick={() => handleMenuItemClick("QueUser")}
        >
          <ListItemButton component={Link} to="/queUser">
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Actionable Items" />
          </ListItemButton>
        </ListItem>
      )}
      <Divider />

      <List>
        {userRole.includes(17) && (
          <ListItem
            className={selectedItem === "consumers" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("consumers")}
          >
            <ListItemButton component={Link} to="/consumer">
              <ListItemIcon>
                <SupervisedUserCircle />
              </ListItemIcon>
              <ListItemText primary="Manage Consumers" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(4) && (
          <ListItem
            className={selectedItem === "additionalDocReq" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("additionalDocReq")}
          >
            <ListItemButton component={Link} to="/additionalDocReq">
              <ListItemIcon>
                <SupervisedUserCircle />
              </ListItemIcon>
              <ListItemText primary="Additional Info Request" />
            </ListItemButton>
          </ListItem>
        )}

        {userRole.includes(4) && (
          <ListItem
            className={selectedItem === "nbfc" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("nbfc")}
          >
            <ListItemButton component={Link} to="/nbfc">
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              <ListItemText primary="Manage NBFC" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(5) && (
          <ListItem
            className={selectedItem === "dealer" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("dealer")}
          >
            <ListItemButton component={Link} to="/dealer">
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Manage Dealer" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(6) && (
          <ListItem
            className={selectedItem === "dsa" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("dsa")}
          >
            <ListItemButton component={Link} to="/dsa">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Manage DSA" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(7) && (
          <ListItem
            className={selectedItem === "gp" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("gp")}
          >
            <ListItemButton component={Link} to="/gp">
              <ListItemIcon>
                <TrendingUp />
              </ListItemIcon>
              <ListItemText primary="Manage GP" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(8) && (
          <ListItem
            className={selectedItem === "staff" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("staff")}
          >
            <ListItemButton component={Link} to="/staff">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Manage Staff" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(9) && (
          <ListItem
            className={selectedItem === "ragt" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("ragt")}
          >
            <ListItemButton component={Link} to="/ragt">
              <ListItemIcon>
                <Autorenew />
              </ListItemIcon>
              <ListItemText primary="Manage Recover Agent" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(10) && (
          <ListItem
            className={selectedItem === "cagt" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("cagt")}
          >
            <ListItemButton component={Link} to="/cagt">
              <ListItemIcon>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText primary="Manage Collection Agent" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(12) && (
          <ListItem
            className={selectedItem === "loanQueue" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("loanQueue")}
          >
            <ListItemButton component={Link} to="/NbfcLoanDetails">
              <ListItemIcon>
                <LocalMall />
              </ListItemIcon>
              <ListItemText primary="Loan Queue" />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(12) && (
          <ListItem
            className={selectedItem === "releaseRequestQueue" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("releaseRequestQueue")}
          >
            <ListItemButton component={Link} to="/ReleaseRequestQueue">
              <ListItemIcon>
                <LocalMall />
              </ListItemIcon>
              <ListItemText primary="Release Request Queue" />
            </ListItemButton>
          </ListItem>
        )}
        {/* {userRole.includes(14) && localStorage.getItem("active") === "true" && ( */}
        {userRole.includes(14) && (
          <ListItem
            className={selectedItem === "DlrCsr" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("DlrCsr")}
          >
            <ListItemButton component={Link} to="/delear-cosumer-deatils">
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Dealer Consumer " />
            </ListItemButton>
          </ListItem>
        )}
        {userRole.includes(14) && (
          <ListItem
            className={selectedItem === "DlrDoc" ? "highlighted" : ""}
            onClick={() => handleMenuItemClick("DlrDoc")}
          >
            <ListItemButton component={Link} to="/dlr-doc-upload">
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Upload Doc " />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default Sidebar;
