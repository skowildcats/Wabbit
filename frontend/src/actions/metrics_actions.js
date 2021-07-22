import * as MetricsUtil from '../util/metrics_util'

export const RECEIVE_METRICS = "RECEIVE_METRICS"

export const receiveMetrics = (metrics) => ({
  type: RECEIVE_METRICS,
  metrics
})

export const fetchMetrics = (userId) => dispatch => (
  MetricsUtil.fetchUserMetrics(userId).then(metrics => (
    dispatch(receiveMetrics(metrics))
  ))
)
