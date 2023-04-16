import { FC, useMemo } from "react";
import { User } from "../../types/User";
import { Button } from "../Button/Button";

interface UserRowProps {
  onClear: (userId: number) => void;
  user: User;
}

const GOOGLE_MAPS_URL_PREFIX = `https://www.google.com/maps?q=`;

export const UserRow: FC<UserRowProps> = ({ onClear, user }) => {
  const formatAddress = useMemo(
    () =>
      [
        user.address.suite,
        user.address.suite,
        user.address.city,
        user.address.zipcode,
      ]
        .filter((s) => s.length)
        .join(", "),
    [user.address]
  );

  const getCoordGoogleSearch = useMemo(
    () =>
      `${GOOGLE_MAPS_URL_PREFIX}${user.address.geo.lat}+${user.address.geo.lng}`,
    [user.address.geo]
  );

  return (
    <tr data-testid="user-row">
      <td className="pr-8 pt-8">{user.id}</td>
      <td className="pr-8 pt-8">{user.name}</td>
      <td className="pr-8 pt-8">{user.username}</td>
      <td className="pr-8 pt-8">
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </td>
      <td className="pr-8 pt-8">
        <a href={getCoordGoogleSearch} rel="noreferrer" target="_blank">
          {formatAddress}
        </a>
      </td>
      <td className="pr-8 pt-8">
        <a href={`tel:${user.phone}`}>{user.phone}</a>
      </td>
      <td className="pr-8 pt-8">
        <a href={`https://${user.website}`} rel="noreferrer" target="_blank">
          {user.website}
        </a>
      </td>
      <td className="pr-8 pt-8">{user.company.name}</td>
      <td className="pr-8 pt-8">
        <Button onClick={() => onClear(user.id)} text="X" />
      </td>
    </tr>
  );
};
