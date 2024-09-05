# Prometheus

## Questions

### What is Prometheus?

Prometheus is an open-source systems monitoring and alerting toolkit with an active ecosystem.

It's open-source metric-based monitoring system that collects metrics from the targets being monitored by scraping http endpoints on the targets.

### In which language are Prometheus components written?

Prometheus components are written in Go language, which makes them easy to build and deploy a static binderies.

### What data model is used?

It uses a `multi-dimensional` data model with `time series data` identified by `metric name` and `key/value pairs`.

http_requests_total {method="get"}
        ^              ^      ^
        |              |      |
    metric name       key   value

### What is PromQL?

PromQL is `read-only` and flexible query language, that allows aggregation across any of the labels stored in its time series.

### Does Prometheus rely on distributed storage?

It was designed to work on a single server and store metrics in memory and local disk.
In short, Prometheus does not rely on distributed storage.

### How to set alerts if I need them in Prometheus?

Prometheus is fully fledged monitoring system with its own Alertmanager.

### When the Prometheus was started?

It was started in 2012 at SoundCloud.
In 2016 it joined the Cloud Native Foundation.

### What is Monitoring?

It is to keep an eye on something.

Monitoring is a systematic process of collecting and recording the activities taking place in a target project, programme or service and then using that recorded values to check if the targets are reaching their objectives or not.

### What is Alert in Prometheus?

An alert is the outcome of an alerting rule in Prometheus that is actively firing.
Alerts are sent from Prometheus to the Alertmanager.

### What is Alertmanager in Prometheus?

The Alertmanager takes  in alerts from Prometheus server, aggregates them into groups, de-duplicates, applies silences, throttles, and then sends out notifications to email, Pagerduty, Slack etc.

### What is Target in Prometheus?

A target is the definition of an object to scrape.
Target is an object whose metrics are to be monitored.

### What is Instance in Prometheus?

An endpoint you can scrape is called an instance.

Instance basically corresponds to a single process to be scrapped.

For example, `1.2.3.4:5670`, `1.2.3.4:5671`, ...

### What is Job in Prometheus?

Job is a collection of targets/instances with the same purpose.

For example, an API server job with four replicated instances:

* job: api-server
  * instance 1: 1.2.3.4:5670
  * instance 2: 1.2.3.4:5671
  * instance 3: 5.6.7.8:5670
  * instance 4: 5.6.7.8:5671

### What is Sample in Prometheus?

A sample is a single value at a point in time in a time series.

For example, http_requests_total {method="get"} -> 32

### What is TSDB?

Prometheus stores metrics in a time-series database (TSDB), which is optimized for high-performance and efficient data retrieval.

### On which port Prometheus is running by default?

Prometheus uses `9090` port - `localhost:9090`.

### What is Exporter?

Exporter is a software or number of libraries and servers that help in exporting existing metrics from third-party systems (like Linux or Windows OS) in the same format as of Prometheus metrics.

Useful for cases where it is not feasible to instrument a given system with Prometheus metrics directly (for example, HAProxy or Linux system stats).

You can think about an exporter as a small one-to-one proxy that converse data between the metrics interface of the target and the Prometheus exposition format.

### What are data types?

* instant vector

  A set of time series containing a single sample for each time series, all sharing the same timestamp.
  For example, `prometheus_http_requests_total`.

* range vector

  A set of time series containing a range of data points over time for each time series.
  For example, `prometheus_http_requests_total[1m]`.
  [1m] here is how far back in time values should be fetched for each resulting range vector element. It's kind of last 1 minute.

* scalar

  A simple numeric floating point value.
  For example, `15.21`.

* string

  A simple string value; currently unused.
  For example, `hello`.

### What is time series?

[https://stackoverflow.com/a/73704908/13018800]

In Prometheus time series is a series of `(timestamp, value)` pairs ordered by `timestamp`. The `value` can contain only numeric values (either integer or fractional).

Every time series in Prometheus has a name. For example, `temperature` or `requests_total`.

Additionally, every time series can have a set of `{key="value"}` labels. For example, `temperature{city="Paris"}` or `requests_total{instance="host123",job="foo_app"}`.

A time series is uniquely identified by its name plus its labels. For example, `temperature{city="Paris"}` and `temperature{city="London"}` are __two different__ time series, since they differ by city label value.

Time series name can be referred as `__name__` pseudo-label in Prometheus. So, `temperature{city="Paris"}` and `{__name__="temperature",city="Paris"}` refer to the same time series.

### What is Matcher?

Matchers are the expressions within label selectors that define how to filter the time series based on label values. They specify the conditions that the labels must satisfy for a time series to be included in the query results.

Matcher types

* Equality matcher (=), it's case-sensitive

  Select labels that are exactly equal to the provided string.
  For example, `process_cpu_seconds_total{job='prometheus'}`.

* Negative Equality matcher (!=)

  Select labels that are not equal to the provided string.
  For example, `process_cpu_seconds_total{job!='prometheus'}`.

* Regular expression matcher (=~)

  Select labels that regex-match with the provided string.
  For example, `prometheus_http_requests_total{handler=~"/api.*"}`.

  Regex matches are fully anchored. A match of `env=~"foo"` is treated as `env=~"^foo$"`.

* Negative Regular expression matcher (!~)

  Select labels that do not regex-match with the provided string.
  For example, `prometheus_http_requests_total{handler!~"/api.*"}`.

### What are binary operators?

Binary operators are the operators that take two operands and performs the specified calculations on them.

* Arithmetic binary operators

  They are defined between scalar/scalar, vector/scalar, vector/vector
  They are +, -, *, /, %, ^.
  For example, `node_memory_Active_bytes / 8` - vector/scalar
  Vector here is only instant vector types.

* Comparison binary operators

  They are defined between scalar/scalar, vector/scalar, vector/vector
  They are ==, !=, >, <, >=, <=.
  For example, `process_open_fds > 12`
  Vector here is only instant vector types.

* Logical/set binary operators

  They are defined between instant vectors only.
  They are `and`, `or`, `unless`.

#### Binary operators examples

```PromQL
node_memory_MemTotal_bytes/1024/1024/1024  # shows result in GB
prometheus_http_requests_total * 2
prometheus_http_requests_total and promhttp_metric_handler_requests_total
prometheus_http_requests_total and ignoring(handler) promhttp_metric_handler_requests_total
prometheus_http_requests_total and on(instance) promhttp_metric_handler_requests_total
prometheus_http_requests_total{environment=""}  # it finds all metrics without `environment` label
prometheus_http_requests_total{replica!="rep-a",replica=~"rep.*"}  # it's okay to use the same label a few time if it makes sense
{job=~".+"}  # Good!
{job=~".*",method="get"}  # Good!
{job=~".*"}  # Bad! Because vector selectors must either specify a name or at least one label matcher that does not match the empty string
{__name__=~".*total.*"} # __name__ points to metric names
prometheus_http_requests_total{handler="/metrics"} offset 10m  # changes the time offset
sum(prometheus_http_requests_total{code="200"} offset 5m)
prometheus_http_requests_total @ 1724792400  # changes the evaluation time to August 27, 2024 11:00:00 PM GMT+02:00
prometheus_http_requests_total @ 1724792400 offset 5m  # Good!
prometheus_http_requests_total offset 5m @ 1724792400  # Good!

sort(node_cpu_seconds_total)
sort_desc(node_cpu_seconds_total)
time()  # timestamp of current time in UTC
(time() - process_start_time_seconds {job="prometheus"}) / 60  # how long the process is up in minutes

node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100  # available memory in %
rate(node_disk_read_time_seconds_total[1m]) / rate(node_disk_reads_completed_total[1m])  # disk read rate
predict_linear(node_filesystem_free_bytes{fstype!~"tmpfs"}[2h], 6 * 3600)  # how much disk will fill in the next 6 hours based on 2 hours of data
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[10m])) * 100)  # CPU usage percentage
```

### What are aggregation operators?

Aggregation operators are special mathematical functions that are used to combine information.

* sum - calculate sum over dimensions
* min - select minimum over dimensions
* max - select maximum over dimensions
* avg - calculate the average over dimensions
* stddev - calculate population standard deviation over dimensions
* stdvar - calculate population standard variance over dimensions
* count - count number of elements in the vector
* count_values - count number of elements with the same value
* bottomk - smallest k elements by sample value
* topk - largest k elements by sample value
* quantile - calculate φ-quantile (0 ≤ φ ≤ 1) over dimensions

#### Aggregation operators examples

sum(prometheus_http_requests_total)
sum(prometheus_http_requests_total) by (code)
topk(3, sum(node_cpu_seconds_total) by (mode))
bottomk(3, sum(node_cpu_seconds_total) by (mode))
max(node_cpu_seconds_total)
count(node_cpu_seconds_total)

### Functions

#### rate()

rate() - calculates the per-second average rate of increase of the time series in the range vector. Rate function takes a range vector and outputs an instant vector.

rate(prometheus_http_requests_total[1m])
rate(prometheus_http_requests_total{handler=~"/api.*"}[1m])

#### irate()

irate() - calculates the instant rate of increase of the time series in the range vector. It really calculates the rate based on the last two data points gathered.

irate(prometheus_http_requests_total[10m])

irate() is used with volatile, fast-moving counters.

#### changes()

changes() - count how many times a gauge metric has changed its value over time.

```PromQL
irate(prometheus_http_requests_total[10m])
changes(process_start_time_seconds{job="node_exporter"}[1h]) # how many times the process node_exporter has restarted in the past one hour
```

#### deriv()

deriv() - is built only for gauge metrics, estimates the slope of each time series in a range vector, and calculates the per-second derivative of the time series in that range vector.

```PromQL
deriv(process_resident_memory_bytes{job="prometheus"}[1h])
```

#### predict_linear()

predict_linear() is one step ahead to deriv(). It predicts the future value of a gauge by checking the previous pattern of a metric in the time rage you provide.

```PromQL
predict_linear(node_memory_MemFree_bytes{job="node_exporter"}[1h], 2*60*60)/1024/1024
```

### What are _over_time functions?

They allow to make calculations over range vectors.

```PromQL
max_over_time(node_cpu_seconds_total[5m])
min_over_time(node_cpu_seconds_total[5m])
avg_over_time(node_cpu_seconds_total[5m])
```

### What are metric types?

* Counter

  A counter is a cumulative metric that represents a single monotonically increasing counter whose value can only increase or it can be reset to zero on restart.
  Counters are mainly used to track how often a particular code path is executed.
  For example, use counters to represent the number of requests served, task completed, or errors.
  Counters have one main method: `inc()` that increases the counter value by one.
  NOTE: Do not use the counters to expose a value that can decrease.

* Gauge

  A gauge i a metric that represents a single numeric value that can arbitrary go up and down.
  Gauges represent a snapshot of some current state.
  For example, used for measured values like temperature, current memory usage, or anything whose value can go both up and down.
  Gauges have three main methods: `inc()`, `dec()`, `set()` that increases, decreases value by one and set the gauge to an arbitrary value respectively.

* Summary

  A Summary samples observations like request durations - how long your application took to respond to a request, latency and request sizes.
  Summarys track the size and number of events.
  Summary has one primary method `observe()` to which we pass the size of the event.
  Summarys expose multiple time series during a scrape.
    The total sum (`<basename>_sum`) of all observed values.
    The count (`<basename>_count`) of events that have been observed.
  Summary metrics may also include quantiles over a sliding time window.

* Histogram

  A Histogram samples observations (usually things like request durations or response sizes) and counts them in configurable buckets.
  The instrumentation for histogram is the same as for Summary.
  Histograms expose multiple time series during a scrape.
    The total sum (`<basename>_sum`) of all observed values.
    The count (`<basename>_count`) of events that have been observed.
  The main purpose of using Histogram is calculating quantiles.

### What are Recording Rules?

Recording rules allow you to precompute frequently needed or compute expensive expressions and save their result as a new set of  time series in Prometheus storage.

Prometheus supports two types of rules which may be configured and then evaluated at regular intervals: Recording rules and Alerting rules.

NOTE: Don't forget to validate the rules with the `promtool` - `./promtool check rules rules/my-rules.yaml`

### How do Recording Rules work?

### Is it possible to reload Prometheus configuration without stopping the Prometheus itself? If yes, how?

1.Sending a SIGHUP signal

  ```bash
  kill -HUP <PID> # HUP - SIGHUP - signal hang up
  ```

2.Sending an HTTP post to Prometheus web server

  ```bash
  curl -X POST http://localhost:9090/-/reload # works only if the Prometheus has been started with --web.enable-lifecycle flag
  ```

### What are the form of Recording rules names?

The pattern is `level:metric:operations`.

level - represents the aggregation level of the metric and labels of the rule output.

metric - the same metric name under the evaluation
Note: with rate() function and Counter metric it's a good practice to strip `_total` suffix from the name.

operations - list of operations that were applied to the metric under evaluation. Newest operations comes first.

For example, for `avg without (cpu) (rate(node_cpu_seconds_total{mode="idle"}[5m]))` we can have `job:node_cpu_seconds:average_rate5m_idle`.
