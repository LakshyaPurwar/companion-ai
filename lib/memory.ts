import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

export type CompanionKey = {
    companionName : string,
    modeName : string,
    userId : string,
}


