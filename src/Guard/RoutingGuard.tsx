import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';
interface RoutingGuardProps {
  component: ReactNode}

const ProtectedGuard: FC<RoutingGuardProps> = (props) => {
  const token=sessionStorage.getItem('accessToken');
  return (
    <div className="RoutingGuard" data-testid="RoutingGuard">
      {token ? (<>{props.component}</>) : <Navigate to="/" />}
    </div>
  )
}

export default ProtectedGuard;
