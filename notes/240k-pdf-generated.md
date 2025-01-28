---
title: 200K+ PDF Invoice in 24 Hours
date: 2025-01-28
image: /240k-pdf-banner.png
tags: system-design system pdf fastify typescript redis
---

# 200K+ PDF Invoice in 24 Hours

Alright, I admit it sounds like a clickbait title, but hear me out; that's exactly what happened.

---
::: tip TLDR
I worked on a backend side project that generated 240,000+ PDF invoices in a 24-hour test. All services were built using Fastify, with Postgres, Redis and other services running as Docker containers on my local dev machine.
:::



::: info Publish in Linkedin
This blog was originally [publish in linkedin](https://www.linkedin.com/pulse/200k-pdf-invoice-24-hours-sabin-raj-dangol-yxvye/)
on 19 May, 2024 before my personal site was up and running.
:::



[[TOC]]

## Background
Throughout my career as a software engineer, I have encountered many systems requiring
PDF generation for purposes such as receipts, invoices, reports, and payslips.
PDFs are the standard for sharing documents, especially when editing is not needed,
making them widely used. However, in the systems I worked on, creating PDFs is often a bottleneck.

I always believed this process could be improved but never attempted to rebuild a system
where PDF bottleneck is resolved. I always had that itch to find a and try a solution.
Meanwhile, I gained exposure to various system designs and the construction of real-time systems.
This inspired me to apply my knowledge by building a system that ultimately generates PDFs efficiently.

## System Introduction
Years ago, I worked with timesheets. The process involved submitting timesheets, which
were then verified by the system. Once verified, these timesheets were used to generate
invoices, and PDF files were created for these invoices. While there was complex business
logic involved, for simplicity, let's assume each timesheet corresponds to a single invoice.

To streamline this process, I chose an event-driven architecture and a microservice pattern.

|![System Design](/aster-system-design.png)| 
|:--:| 
| *System Design* |

The timesheet service serves as the entry point to the system, providing an API for
timesheet submission. Once a timesheet is stored in the database, an event is registered
in the message queue. The invoice service, which subscribes to this event, is then notified.
Upon notification, the invoice service reads the timesheet and records invoice in the invoice
database. Subsequently, an invoice creation event is registered in the same message queue.
A PDF service, which subscribes to the invoice creation event, reads the invoice details and
generates a PDF file in the local file system. This outlines the fundamental data flow and
operational process of the system.

## Tech Stack
1. **Fastify** to create services as recently read Fastify book and I enjoyed working with it very much.
1. **Redis** as message broker running as docker container. Potentially will be replaced by valkey.io
1. **Postgres** as database running as docker container. 
1. **Prometheus** for to collect metrics and running as docker container.
1. **Grafana** dashboard also running as docker container to present metrics visually.
1. **Prisma** as an ORM.
1. **BullMQ**: A redis based message queue.
1. **FakerJS** and **RosieJS** to generate fake data for testing. 
1. **Locust** for running the load test.

## Timesheet Service

Timesheet service is a fastify service that expose single post request endpoint.
For testing purpose, I used rosie and fakerjs to generate fake timesheet. When the
endpoint is hit (without any payload), a timesheet is generated and stored in database.
Once stored, timesheet_created event is registered. For detail with message queue, I've
used bullmq.

## Invoice Service 

It's very similar to the timesheet service, except it doesn't have any HTTP endpoints.
Instead, it subscribes to the message queue for the timesheet_created event. When the
event arrives, the service reads the timesheet ID from the message, retrieves the
timesheet from the database, and generates the invoice. The invoice details are then
stored in the invoice database, and an invoice_created event is registered in the
message queue. In this step, I include the entire invoice detail in the message to
test the queue's handling capacity.

## PDF Service

This service is also a fastify service and subscribes to invoice_created event. To the
PDF I've used chromium (puppeteer to be specific). The trick here is to create invoice
page and load in chromium, after it is rendered then save the page as PDF in as same way
as you do in chromium based browser. Handling those things are made easy with puppeteer.
The service then stored the pdf file from chromium stream to the file stream. For now its
stored the file is a folder but cloud storage like S3 would be a ideal choice for real
application. 

This service, also built with Fastify, subscribes to the invoice_created event. For PDF
generation, I used Chromium (specifically Puppeteer). The key is to create the invoice
page, load it in Chromium, and then save the rendered page as a PDF, just like you would
in a Chromium-based browser. Puppeteer simplifies this process by providing different
API to interact with the browser in background. The service then takes the PDF file
from the Chromium stream and saves it to a file stream. Currently, the file is
stored in a folder, but for a real application, cloud storage like S3 would be
the ideal choice.

## Metrics and Dashboard

For metrics, all events were captured using Prometheus. When an event occurs, the
service logs the metrics, which are then scraped by the Prometheus service every
5 seconds. Following standard practice, these metrics are then visualized on a
Grafana dashboard.

## Locust

Opting for Locust for load testing was a clear choice. This Python tool allows
scripting tests in Python and provides a web UI for test execution. For testing
python scripts simply hits the endpoint in timesheet service without any payload.
After letting the test run for 24 hours, I expected a service to crash due to
the load.

Upon reviewing the Grafana dashboard, I was surprised to see plus 240,000
invoices created. Initially, I doubted my configuration, but upon checking the
files, I confirmed the astonishing number of PDFs generated. This unexpected
outcome prompted me to share my experience.


## Further works

**Message Queue Event**: Ideally, message event could have been created using
Postgres database notification instead of application code. This makes sure the
system is resilient in case timesheet has been recorded using service or channels. 

Although, BullMQ is better choice for this proejct, **Kafka** could have been better
suited for real world project. Features like message durability, message replay
and scalability would kafka attractive choice. 

Ideally, PDF file should be stored in any cloud storage like **S3**. Cloud storage
simply makes is easy to securely store and share files.

## Conclusion

The journey of a software engineer is marked by continuous learning. With the
constant introduction of new technologies, platforms, frameworks, and tools,
it's nearly impossible to stay updated on everything, especially as a full-stack
developer. However, maintaining a grasp of essential tools and concepts aids in
comprehending and architecting systems.

Conceptualizing and actively working on a system are distinct experiences. Along
the way, you encounter numerous unexpected challenges that you hadn't anticipated.
The outcomes of these projects often bring surprises and excitement, altering your
perspective and fueling your passion and enthusiasm as a software engineer.

