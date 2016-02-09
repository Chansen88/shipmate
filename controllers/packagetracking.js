'use strict';
const https = require('https');
const shipit = require('shipit');
const moment = require('moment');
const config = require('../env.json')[process.env.NODE_ENV || 'production'];

const ups = new shipit.UpsClient({
  licenseNumber: config.UPS_LICENSE_NUMBER,
  userId: config.UPS_USER_ID,
  password: config.UPS_PASSWORD
});

const usps = new shipit.UspsClient({
  userId: config.USPS_USER_ID
});

const fedex = new shipit.FedexClient({
  key: config.FEDEX_KEY,
  password: config.FEDEX_PASSWORD,
  account: config.FEDEX_ACCOUNT,
  meter: config.FEDEX_METER
});

function gsend(err, result, service, packagedata, senddata) {
  if (err || result.status === 0) {
    console.log(err);
    if (result) {
      console.log(result);
    }
    senddata.json(false);
  } else {
    const packageInfo = {
      from: packagedata.from,
      id: packagedata.id,
      service: service,
      shippingTo: result.destination,
      progress: result.activities,
      eta: moment(result.eta).unix()
    };

    if (result.eta !== undefined) {
      packageInfo.deliveryDate = result.eta;
    }

    if (result.activities && result.activities[0] &&
        result.activities[0].location) {
      packageInfo.currentLocation = result.activities[0].location;
      if (result.activities[0].details === 'Delivered') {
        packageInfo.delivered = true;
        packageInfo.eta = moment(result.activities[0].timestamp).unix();
      }
    }

    if (result.activities.length === 1 &&
        result.activities[result.activities.length - 1].location !== 'US') {
      packageInfo.shippingFrom = result.activities[result.activities.length - 1].location;
    } else if (result.activities.length >= 2) {
      packageInfo.shippingFrom = result.activities[result.activities.length - 2].location;
    }

    if (packageInfo.delivered === true) {
      packageInfo.whenDelivered = 'Delivered';
    } else if (!packageInfo.deliveryDate ||
                packageInfo.deliveryDate === 'undefined') {
      packageInfo.whenDelivered = 'Delivery not scheduled.';
    } else if (moment(packageInfo.deliveryDate).diff(moment()) <= 0) {
      packageInfo.delivered = true;
      packageInfo.whenDelivered = 'Delivered';
    } else {
      packageInfo.whenDelivered = moment(packageInfo.deliveryDate).fromNow();
    }

    senddata.json(packageInfo);
  }
}

apiRouter.route('/upsfetch')
 .post(function(req, res) {
  const upsPackage = JSON.parse(req.body.upsTrackingId);
  ups.requestData({trackingNumber: upsPackage.id}, send);
  function send(err, result) {
    gsend(err, result, 'UPS', upsPackage, res);
  };
});

apiRouter.route('/fedexfetch')
 .post(function(req, res) {
  const fedexPackage = JSON.parse(req.body.fedexTrackingId);
  console.log(fedexPackage.id);
  fedex.requestData({trackingNumber: fedexPackage.id}, send);
  function send(err, result) {
    gsend(err, result, 'FEDEX', fedexPackage, res);
  }
});

apiRouter.route('/uspsfetch')
 .post(function(req, res) {
  const uspsPackage = JSON.parse(req.body.uspsTrackingId);
  usps.requestData({trackingNumber: uspsPackage.id}, send);
  function send(err, result) {
    gsend(err, result, 'USPS', uspsPackage, res);
  };
});
