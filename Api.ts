import express from "express";
import path from 'path';
const Api = express();
import { verifyToken } from "./JWT";
// routes
import UserRouter from './Routers/UserRouter'
import AuthRouter from "./Routers/AuthRoute";
import CompanyRouter from "./Routers/CompanyRouter";
import PermissionRouter from "./Routers/PermissionRouter";
import RoleRouter from "./Routers/RoleRouter";
import RolePermissionRouter from "./Routers/RolePermissionRouter";
import AssetTypeRouter from "./Routers/AssetTypeRouter";
import UnitRouter from "./Routers/UnitRouter";
import MonitoringTypeRouter from "./Routers/MonitoringTypeRouter";
import MediaRouter from "./Routers/MediaRouter";
import AssetRouter from "./Routers/AssetRouter";
import AssetMonitoringRouter from "./Routers/AssetMonitoringRouter";
import NotificationTypeRouter from "./Routers/NotificationTypeRouter";
import CompanyAssetRouter from "./Routers/CompanyAssetRouter";
import MonitoringLogRouter from './Routers/MonitoringLogRouter'
import NotificationRouter from "./Routers/NotificationRouter";
// login
Api.use('/auth', AuthRouter);
Api.use('/uploads', express.static('uploads'));
Api.use(verifyToken)
// other crud
Api.use('/media', MediaRouter);
Api.use('/asset', AssetRouter);
Api.use('/notification', NotificationRouter);
Api.use('/companyAsset', CompanyAssetRouter);
Api.use('/notificationType', NotificationTypeRouter);
Api.use('/permission', PermissionRouter);
Api.use('/monitoringLog', MonitoringLogRouter);
Api.use('/role', RoleRouter);
Api.use('/rolePermission', RolePermissionRouter);
Api.use('/assetType', AssetTypeRouter);
Api.use('/monitoringType', MonitoringTypeRouter);
Api.use('/user', UserRouter);
Api.use('/unit', UnitRouter);
Api.use('/company', CompanyRouter);
Api.use('/assetMonitoring', AssetMonitoringRouter);
export default Api;