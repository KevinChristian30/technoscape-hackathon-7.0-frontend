"use client"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

import ReactSpeedometer from "react-d3-speedometer"

import { CalendarDateRangePicker } from "@/components/ui/CalenderDatePicker"
import { useEffect, useState } from "react"
import http from "@/lib/axios"


export default function DashboardPage() {

  const [date, setDate] = useState()
  const [score, setScore] = useState(0)

  function getStatisfaction() {

    console.log(date);


    const payload = {
      startDate: Date.now(),
      endDate: Date.now()
    }
    http.post("", payload)
      .then(res => {
        setScore(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })


  }

  useEffect(() => {
    getStatisfaction()

    return () => {

    }
  }, [])



  return (
    <>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Analysis</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker {...setDate} />
            <Button className="text-secondary">Check Satisfaction</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">

              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"></div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium"></CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"></div>
              <p className="text-xs text-muted-foreground">

              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">

              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"></div>
              <p className="text-xs text-muted-foreground">

              </p>
            </CardContent>
          </Card>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Customer's Satisfaction At Its Finest With Our Top Of The Line AI Model</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">

            </CardContent>
          </Card>


          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent accomplishments</CardTitle>
              <CardDescription>
              </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
          </Card>
        </div>

        <div className="flex w-full justify-center items-center py-10 flex-col">
          <div style={{
            width: "500px",
            height: "300px",
            background: "transparent"
          }}>
            <ReactSpeedometer
              fluidWidth={true}
              minValue={1}
              maxValue={10}
              value={1}
              segments={1000}
              maxSegmentLabels={10}
              needleColor="steelblue"
            />
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Score : {score}</h2>

        </div>
      </div>

    </>
  )
}