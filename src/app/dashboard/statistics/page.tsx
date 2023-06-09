"use client";
import { getStatistics } from "@/utils/api/statistics";
import { useCurrentContext } from "@/utils/context/CurrentContext";
import { Card, Col, Row, Spin, Tooltip, Typography } from "antd";
import React, { useEffect } from "react";

const { Title } = Typography;

export default function Statistics() {
  const [stats, setStats] = React.useState({});
  const { isUserVerified, code } = useCurrentContext();

  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    async function getStatisticsFromBackend() {
      setIsLoading(true);
      const res = await getStatistics({ code });
      setStats(res.data);
      setIsLoading(false);
    }
    getStatisticsFromBackend();
  }, []);

  if (!isUserVerified) {
    return <div>Not Authorized</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-[95vh] flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <Row gutter={16}>
        {Object.keys(stats).map((key: string, index) => {
          return (
            <Col
              title={key
                .split(/(?=[A-Z])/)
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
              style={{ marginBottom: "1rem" }}
              span={8}
              key={index}
            >
              <Card
                className="min-w-full"
                title={key
                  .split(/(?=[A-Z])/)
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
                bordered={false}
              >
                {/* @ts-ignore */}
                <Title level={3}> {stats?.[key]}</Title>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
