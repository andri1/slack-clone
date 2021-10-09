import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Channel = {
  __typename?: 'Channel';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateChannelInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  createUser: User;
  deleteChannel: Channel;
  deleteUser: User;
  login: LoginPayload;
  signup: LoginPayload;
  updateChannel: Channel;
  updateUser: User;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteChannelArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  input: CreateUserInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  channel: Channel;
  channels?: Maybe<Array<Channel>>;
  me: User;
  user: User;
  users?: Maybe<Array<User>>;
};


export type QueryChannelArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type UpdateChannelInput = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Channel: ResolverTypeWrapper<Channel>;
  CreateChannelInput: CreateChannelInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginPayload: ResolverTypeWrapper<LoginPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateChannelInput: UpdateChannelInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Channel: Channel;
  CreateChannelInput: CreateChannelInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  LoginPayload: LoginPayload;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  UpdateChannelInput: UpdateChannelInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LoginPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<ResolversTypes['LoginPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'login' | 'password'>>;
  signup?: Resolver<ResolversTypes['LoginPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updateChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<QueryChannelArgs, 'id'>>;
  channels?: Resolver<Maybe<Array<ResolversTypes['Channel']>>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Channel?: ChannelResolvers<ContextType>;
  Date?: GraphQLScalarType;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

