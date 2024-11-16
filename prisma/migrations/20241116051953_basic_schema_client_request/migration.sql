-- CreateTable
CREATE TABLE "ClientRequest" (
    "id" SERIAL NOT NULL,
    "searchOption" JSONB NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientRequestResult" (
    "requestId" INTEGER NOT NULL,
    "advertisingHomeId" INTEGER NOT NULL,

    CONSTRAINT "ClientRequestResult_pkey" PRIMARY KEY ("requestId","advertisingHomeId")
);

-- AddForeignKey
ALTER TABLE "ClientRequest" ADD CONSTRAINT "ClientRequest_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRequestResult" ADD CONSTRAINT "ClientRequestResult_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "ClientRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRequestResult" ADD CONSTRAINT "ClientRequestResult_advertisingHomeId_fkey" FOREIGN KEY ("advertisingHomeId") REFERENCES "AdvertisingHome"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
