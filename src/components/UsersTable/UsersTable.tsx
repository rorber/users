import { FC, useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../services/user.service";
import { User } from "../../types/User";
import { Button } from "../Button/Button";
import { UserRow } from "../UserRow/UserRow";
import { Loading } from "../Loading/Loading";
import { Modal } from "../Modal/Modal";

export const UsersTable: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);

  const { isError, isLoading, isRefetching, isRefetchError, refetch } =
    useQuery(
      ["users"],
      async () => {
        const { data } = await getUsers();
        setUsers(data);
      },
      { useErrorBoundary: false }
    );

  const clearUser = (userId: number) => {
    const usersAfterClear = users.filter(({ id }) => id !== userId);
    setUsers(usersAfterClear);
  };

  const clearAllUsers = () => {
    setUsers([]);
    setShowModal(false);
  };

  const tableComponent = (
    <div className="overflow-x-auto">
    <table className="text-left">
      <thead>
        <tr>
          <th className="pr-8">ID</th>
          <th className="pr-8">Name</th>
          <th className="pr-8">Username</th>
          <th className="pr-8">Email</th>
          <th className="pr-8">Address</th>
          <th className="pr-8">Phone</th>
          <th className="pr-8">Website</th>
          <th className="pr-8">Company</th>
          <th className="pr-8 text-center">Clear</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} onClear={clearUser} user={user} />
        ))}
      </tbody>
    </table>
  </div>
  )

  const renderState = () => {
    if (isError || isRefetchError) {
      return (<p>Error retrieving users. Please click Refresh to try again.</p>)
    } else if (isLoading || isRefetching) {
      return (<Loading />)
    }
    return tableComponent
  }

  return (
    <div>
      <div className="align-center flex justify-between mb-4">
        <h2 className="text-lg lg:text-xl" data-testid="users-tbl-heading">
          Users {!!users.length && `(${users.length})`}
        </h2>
        <div>
          <Button
            backgroundColour="brand"
            colour="white"
            disabled={!!users.length}
            onClick={() => refetch()}
            testId="refresh-btn"
            text="Refresh"
            title={
              !!users.length
                ? "Refresh is enabled when there are no users in the list"
                : "Refresh"
            }
          />
          <Button
            classes="ml-2"
            disabled={!users.length}
            onClick={() => setShowModal(true)}
            testId="clear-all-btn"
            text="Clear all"
            title={!users.length ? "No users in the list" : "Clear all"}
          />
        </div>
      </div>

      {renderState()}

      <Modal show={showModal}>
        <div className="mb-4">Do you want to clear all users?</div>
        <div className="flex justify-center">
          <Button
            backgroundColour="brand"
            colour="white"
            onClick={clearAllUsers}
            text="Yes"
          />
          <Button
            classes="ml-2"
            onClick={() => setShowModal(false)}
            text="No"
          />
        </div>
      </Modal>
    </div>
  );
};
